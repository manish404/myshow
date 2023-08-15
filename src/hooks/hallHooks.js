import { useQuery } from "@tanstack/react-query";
import { getHalls, getHall } from "@/db/halls";
import println from "@/helpers/print";

const staleTime = (process.env.NODE_ENV === 'development' ? 5 : 2)
    * 60 * 1000; // cache-time in minutes, converted to ms;

const useHall = (hallID = null, hall = null) => {
    // println('useHall hook called!');
    const keys = hallID ? [`hall-${hallID}`] : [`hall-${hall.id}`, `hall-${hall.city}`];
    return useQuery(keys, () => getHall(parseInt(hallID), hall), { staleTime })
}

const useHalls = (adminID, cityID, limit) => {
    const keys = adminID ? [`halls-${adminID}`] : cityID ? [`halls-${cityID}`] : [`halls-${limit}`];
    return useQuery(keys, () => getHalls(adminID, cityID, limit), { staleTime })
}

export { useHall, useHalls };