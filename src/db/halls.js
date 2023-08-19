import supabase from "@/db/supabase";
import println from "@/helpers/print";

const hallColumns = 'id, name, rows, columns, cities(name), movies(title,slug, release_date)';

const getHalls = async (adminID = null, cityID = null, limit = null) => {
    println('[+] Fetching halls!');
    println(`using [adminID:${adminID}, cityID:${cityID}, limit:${limit}]`);
    let data, error;
    if (adminID) {
        ({ data, error } = await supabase.from('halls').select(hallColumns).eq('created_by', adminID));
    } else if (cityID) {
        ({ data, error } = await supabase.from('halls').select(hallColumns).eq('city', cityID));
    } else if (limit) {
        ({ data, error } = await supabase.from('halls').select(hallColumns).limit(limit));
    }
    if (error) {
        println(error.message);
        return null;
    } else println(data);
    return data;
}

async function getHall(id /**hall-id or hall-name */, hall) {
    println(id);
    if (!id) return hall;
    println(`[+] Fetching hall "${id}"!`);
    let data, error;
    if (typeof id === 'number') {
        println(`Searching  hall#${id}`);
        ({ data, error } = await supabase.from('halls').select(hallColumns).eq('id', id));
    }
    else {
        id = id.toLowerCase();
        ({ data, error } = await supabase.from('halls').select(hallColumns).like('name', `%${id}%`));
    }
    // println(data, error);
    if (error) return null;
    data = data[0] || null;
    return data;
}

export { getHalls, getHall };