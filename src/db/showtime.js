import println from "@/helpers/print";
import supabase from "./supabase";

export async function getShowTimes(hallID, movie/**slug */) {
    // println(`"${movie}"`);
    const { data, error } = await supabase.from('showtimes').select('id,time,shift')
        .eq('hall', hallID).eq('movie', movie);
    if (error) return null;
    return data;
}

export async function getShowTimesByMovie(movie) {
    const { data, error } = await supabase.from('showtimes').select('id,time,shift,hall').eq('movie', movie);
    if (error) return null;
    return data;
}