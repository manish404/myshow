import { useQuery } from "@tanstack/react-query";
import println from "@/helpers/print";
import supabase from "@/db/supabase";

const staleTime = (process.env.NODE_ENV === 'development' ? 5 : 1 / 2)
    * 60 * 1000; // cache-time in minutes, converted to ms;

const COLS = 'id, date, movies(title), halls(name, cities(name)), showtimes(time, shift, ticket_price), booked, seats';
async function getBookings(uid, hallId) {
    println("Fetching my bookings");
    let data, error;
    if (uid) ({ data, error } = await supabase.from('bookings')
        .select(COLS)
        .eq('booked_by', uid));
    else if (hallId) ({ data, error } = await supabase.from('bookings')
        .select(COLS)
        .eq('hall', hallId));
    if (error) return null;
    println(`bookings hall:${hallId} or user:${uid}`, data);
    return data;
}

const useBookings = (uid, hallId) => {
    const keys = uid ? [`bookings-${uid}`] : [`bookings-${hallId}`];
    return useQuery(keys, () => getBookings(uid, hallId), { staleTime })
}

export { useBookings };