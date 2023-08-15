import InputNotice from "@/components/inputs/InputNotice";
import { hallSchema, hallValidator } from "@/schema/hall";
import { validate } from "@/validators";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setInputNotice, setNotice } from "@/store/slices/common";
import Loader from "@/components/Loader";
import supabase from "@/db/supabase";
import { useAuthContext } from "@/contexts/AuthContext";
import { useCities } from "@/hooks/addressHooks";

function HallForm() {
    const { user: { user: { id: uid } } } = useAuthContext();
    const [hall, setHall] = useState({ ...hallSchema });
    const [uploadStatus, setUploadStatus] = useState(false);
    // 
    const { data: cities } = useCities();
    // 
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setHall({
            ...hall,
            [name]: value
        })
    }
    async function handleSubmit(e) {
        e.preventDefault();
        hall.created_by = uid;
        setUploadStatus(true);
        // println(hall);
        const { status, errors } = await validate(hall, hallValidator);
        if (status) {
            const { data: hallData, error: hallUploadError } = await supabase
                .from('halls')
                .insert([hall]);

            if (hallUploadError) {
                setUploadStatus(false);
                dispatch(setNotice('Hall upload failed!'));
                return;
            }
            setUploadStatus(false);
            dispatch(setNotice(`Hall "${hall.name}" uploaded!`));
            setHall({ ...hallSchema });
        } else {
            setUploadStatus(false);
            errors.forEach(err => {
                dispatch(setInputNotice({ name: err.path[0], message: err.message }));
            })
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="right w-1/2 m-auto">
                <h1 className="font-semibold text-lg">Add New Hall</h1>
                <div className="name input-row">
                    <label htmlFor="name">Hall's Name</label>
                    <input className="" type="text" name="name" value={hall.name}
                        onChange={handleChange} />
                    <InputNotice name={"name"} />
                </div>
                <div className="rows input-row">
                    <label htmlFor="hall_rows">Hall's rows</label>
                    <input className="" type="number" name="rows" value={hall.rows} onChange={handleChange} />
                    <InputNotice name={"rows"} placeholder="Hall's Rows" />
                </div>
                <div className="columns input-row">
                    <label htmlFor="hall_columns">Hall's columns</label>
                    <input className="" type="number" name="columns" value={hall.columns} onChange={handleChange} />
                    <InputNotice name={"columns"} placeholder="Hall's Columns" />
                </div>
                {/* ADDRESS */} {/**Implement proper hall searching form */}
                <div className="col input-row">
                    <label htmlFor="hall_columns">Hall's columns</label>
                    <select name="city" value={hall.city} onChange={handleChange}>
                        <option value="">Select City</option>
                        {
                            cities && cities.map((city, i) => (
                                <option key={i} value={city.id}>{city.name}</option>
                            ))
                        }
                    </select>
                </div>
                {/*  */}
                <div className="">
                    <button type="submit">
                        {
                            uploadStatus ? <Loader /> : "Upload"
                        }
                    </button>
                </div>
            </div>
        </form>
    )
}

export default HallForm;