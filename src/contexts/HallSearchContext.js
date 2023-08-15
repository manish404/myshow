import { addressSchema } from "@/schema/hall";
import { createContext, useContext, useState } from "react";

const HallSearchContext = createContext({});

function useHallSearchContext() {
    return useContext(HallSearchContext);
}

function HallSearchContextProvider({ children }) {
    const [address, setAddress] = useState({
        ...addressSchema,
        ['city']: localStorage.getItem('user_city') || ''
    });

    return (
        <HallSearchContext.Provider value={{
            hallAddress: { address, setAddress }
        }}>
            {children}
        </HallSearchContext.Provider>
    )
}

export default HallSearchContextProvider
export { useHallSearchContext }