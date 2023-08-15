import supabase from "@/db/supabase";
import println from "@/helpers/print";

const buildImageLink = (fileName) => {
    return process.env.NEXT_PUBLIC_STORAGE_URL + 'movie_images/' + fileName;
}

const movieColumns = 'title, description, image, release_date, slug';

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

const getMovies = async (releasing_soon/**false by default */) => {
    println('[+] Fetching movies!', 'releasing_soon', releasing_soon);
    // 
    const [today, tomorrow] = getDate();
    // 
    let data, error;
    if (releasing_soon) {
        ({ data, error } = await supabase.from('movies').select('title, slug')
            .or(`release_date.gt.${today}`, `release_date.gt.${today}`));
    } else {
        ({ data, error } = await supabase.from('movies').select(movieColumns).limit(10));
        data = data.map(movie => {
            return { ...movie, ['imageURL']: buildImageLink(movie.image) }
        });
    }
    if (error) return null;
    println(data);
    return data;
}

async function getMovie(slug_title, movie) {
    if (movie) return movie;
    println(`[+] Fetching movie ${slug_title}!`);
    let { data, error } = await supabase.from('movies')
        .select(movieColumns)
        .or(`title.ilike.%${slug_title}%`, `slug.ilike.%${slug_title}%`);
    if (error) return null;
    data = data[0];
    data['imageURL'] = buildImageLink(data.image);
    return data;
}

export { getMovies, getMovie };