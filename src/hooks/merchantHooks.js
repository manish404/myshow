import { getMerchants } from "@/db/merchants";
import { useQuery } from "@tanstack/react-query";

const staleTime = (process.env.NODE_ENV === 'development' ? 5 : 1 / 2)
    * 1000 * 60;

function useMerchants() {
    return useQuery([`merchants`], () => getMerchants(), { staleTime });
}

export { useMerchants };