import supabase from "@/db/supabase";
import println from "@/helpers/print";

const buildImageLink = (fileName = '') => {
    if (!fileName) return '';
    return process.env.NEXT_PUBLIC_STORAGE_URL + 'movie_images/' + fileName;
}

function getDate() {
    const today = new Date();
    today.setHours(today.getHours() - today.getTimezoneOffset() / 60);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Format the dates as strings in 'YYYY-MM-DD' format
    const formattedToday = today.toISOString().split('T')[0];
    const formattedTomorrow = tomorrow.toISOString().split('T')[0];
    return [formattedToday, formattedTomorrow];
}

const movieColumns = 'id, title, description, image, release_date, slug';

async function isMovieLiked(userId, movieId) {
    if (!userId) return false;
    println(`isMovieLiked: ${userId}-${movieId}`);
    const { data, error } = await supabase.from('saved')
        .select('id').eq('user', userId).eq('movie', movieId);
    // println(data, error);
    if (data.length > 0) return true;
    return false;
}

const getMovies = async (userId, releasing_soon/**false by default */) => {
    println('[+] Fetching movies!', 'releasing_soon', releasing_soon);
    // 
    const [today, tomorrow] = getDate();
    // 
    let data, error;
    if (releasing_soon) {
        ({ data, error } = await supabase.from('movies')
            .select('title, slug').order("release_date")
            .or(`release_date.gt.${today}`, `release_date.lt.${today}`));
    } else {
        ({ data, error } = await supabase.from('movies')
            .select(movieColumns).order("release_date", { ascending: false }).limit(20));
        if (error) return null;
        data = await Promise.all(data.map(async (movie) => {
            const isLiked = await isMovieLiked(userId, movie?.id);
            return { ...movie, imageURL: buildImageLink(movie?.image), isLiked };
        }));
    }
    if (error) return null;
    println(data);
    return data;
}

async function getMovie(userId, slug_title, movie) {
    if (movie) return movie;
    println(`[+] Fetching movie "${slug_title}"!`);
    let { data, error } = await supabase.from('movies')
        .select(movieColumns)
        .or(`slug.eq.${slug_title}`, `slug.ilike.%${slug_title}%`); // don't change this "or" format;
    if (error) return null;
    println('movie', data, error);
    data = data[0];
    if (!data) return null;
    data['imageURL'] = buildImageLink(data?.image);
    if (userId) data['isLiked'] = await isMovieLiked(userId, data?.id);
    return data;
}

async function deleteMovie(movieId) {
    if (!movieId) return false;
    const { data, error } = await supabase.from('movies').delete().eq('id', movieId);
    if (error) return false;
    return true;
}

async function markMovieAsFavourite(userId, movieId) {
    if (!(userId && movieId)) return false;
    println(`Saving movie ${movieId} by _.`);
    const { data, error } = await supabase.from('saved').insert([
        { user: userId, movie: movieId }
    ]);
    println(data, error);
    if (error) return false;
    return true;
}

async function removeFavourite(userId, movieId) {
    if (!(userId && movieId)) return false;
    println(`Removing favourite movie ${movieId} by _.`);
    const { data, error } = await supabase.from('saved').delete({ count: 1 }).eq('movie', movieId).eq('user', userId);
    if (error) return false;
    return true;
}

async function getSavedMovies(userId) {
    if (!userId) return null;
    println('[+] Fetching saved movies!', 'by', userId);
    let { data: selectedMovies, error: selectedTableError } = await supabase.from('saved').select('movie').eq('user', userId);
    println('saved-movies', selectedMovies);
    if (selectedTableError) return null;
    selectedMovies = selectedMovies.map(movie => movie.movie);
    let { data, error } = await supabase.from('movies')
        .select('title, image, release_date, slug)').in('id', selectedMovies);
    if (error) return null;
    data = data.map((movie) => {
        return { ...movie, imageURL: buildImageLink(movie?.image), isLiked: true };
    });
    println('saved-movie-details', data);
    return data;
}

export { getMovies, getMovie, deleteMovie, markMovieAsFavourite, removeFavourite, getSavedMovies };