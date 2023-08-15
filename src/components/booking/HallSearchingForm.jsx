import { useHallSearchContext } from "@/contexts/HallSearchContext";
import { capitalize } from "@/helpers/string";
import { useCities, useDistricts, useProvinces } from "@/hooks/addressHooks";
import { useEffect } from "react";

function AddressInput({ inputName }) {
    const { hallAddress: { address, setAddress } } = useHallSearchContext();
    let data, error;
    switch (inputName) {
        case 'province':
            ({ data, error } = useProvinces());
            break;
        case 'district':
            ({ data, error } = useDistricts(address.province));
            break;
        case 'city':
            ({ data, error } = useCities(address.district));
            break;
    }
    useEffect(() => { }, [address[inputName]]);
    // 
    function handleChange(e) {
        const { name, value } = e.target;
        if (value === "" || !value) return;
        setAddress(prevAddress => ({
            ...prevAddress,
            [name]: value
        }));
    }
    // 
    return (
        <div className={inputName}>
            <select name={inputName} onChange={handleChange}>
                <option value="">Select {capitalize(inputName)}</option>
                {
                    data &&
                    data.map((item, i) => (
                        <option key={i} value={item.id}>{item.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

function HallSearchingForm() {
    const { hallAddress: { address: { province, district, city } } } = useHallSearchContext();
    return (
        <div className="hall-search">
            <h1 className="font-semibold text-xl">Hall Search</h1>
            <form className="row justify-between bg-green-400 p-4 rounded-sm">
                <AddressInput inputName="province" />
                {province &&
                    <AddressInput inputName="district" />
                }
                {district &&
                    <AddressInput inputName="city" />
                }
            </form>
            {/* {city &&
                <div className="row items-center">
                    <input checked={localStorage.getItem('user_city') ? true : false} className="pointer" onChange={() => { }} onClick={(e) => {
                        const { name, checked } = e.target;
                        if (checked) localStorage.setItem(name, city);
                        else localStorage.removeItem(name);
                    }} type="checkbox" name="user_city" />
                    <span> &nbsp; Save City</span>
                </div>
            } */}
        </div>
    )
}

export default HallSearchingForm;