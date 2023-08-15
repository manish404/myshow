import { useQuery } from "@tanstack/react-query";
import println from "@/helpers/print";
import supabase from "@/db/supabase";

const staleTime = (process.env.NODE_ENV === 'development' ? 5 : 2)
    * 60 * 1000; // cache-time in minutes, converted to ms;

async function getMyBookings(uid) {
    println("Fetching my bookings");
    const { data, error } = await supabase.from('bookings')
        .select('date, movies(title),  halls(name), showtimes(time, shift), booked, seats')
        .eq('booked_by', uid);
    if (error) return null;
    println('from my-bookings', data);
    return data;
}

const useBookings = (uid) => {
    const keys = [`bookings-${uid}`];
    return useQuery(keys, () => getMyBookings(uid), { staleTime })
}

export { useBookings };