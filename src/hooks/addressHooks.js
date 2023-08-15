import supabase from "@/db/supabase";
import { useQuery } from "@tanstack/react-query";

const staleTime = 30 * 60 * 1000; //30 minutes converted into ms

async function getProvinces() {
    const { data, error } = await supabase.from('provinces').select('id, name');
    if (error) return null;
    return data;
}
async function getDistricts(provinceID) {
    const { data, error } = await supabase.from('districts').select('id, name').eq('provinceID', provinceID);
    if (error) return null;
    return data;
}
async function getCities(districtID = null) {
    let data, error;
    if (districtID) ({ data, error } = await supabase.from('cities').select('id, name').eq('districtID', districtID));
    else ({ data, error } = await supabase.from('cities').select('id, name'));
    if (error) return null;
    return data;
}

const useProvinces = () => {
    return useQuery(
        [`provinces`],
        getProvinces,
        { staleTime }
    );
}
const useDistricts = (provinceID) => {
    return useQuery(
        [`districts-${provinceID}`],
        () => getDistricts(provinceID),
        { staleTime }
    );
}
const useCities = (districtID) => {
    return useQuery(
        [`cities-${districtID}`],
        () => getCities(districtID),
        { staleTime }
    );
}

export { useProvinces, useDistricts, useCities };