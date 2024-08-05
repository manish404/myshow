import supabase from "@/db/supabase"
import { useState } from "react";
import Loader from "../Loader";
import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setNotice } from "@/store/slices/common";
import println from "@/helpers/print";
import Info from "../Info";
import Joi from "joi";
import { validate } from "@/validators";
import { useShowTimes } from "@/hooks/showtimeHooks";

const _showtimeSchema = (hallID, movie) => ({
    time: '',
    shift: 0,
    hall: hallID,
    movie: movie,
    ticket_price: '',
});

const showtimeValidator = Joi.object({
    time: Joi.string().regex(/\d{1,2}:\d{2}/).required().label('Show Time'),
    shift: Joi.number().min(0).max(1).required().label('Shift'),
    hall: Joi.allow(),
    movie: Joi.allow(),
    ticket_price: Joi.required(),
})

export default function ShowtimeForm({ hallID, movie }) {
    const showtimeSchema = _showtimeSchema(hallID, movie);
    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const [uploading, setUploading] = useState(false);
    const [showtime, setShowtime] = useState({ ...showtimeSchema });
    const [options, setOptions] = useState([]);
    const { data: showTimes } = useShowTimes(hallID, movie);
    // 
    const isTimeIncluded = () => showTimes.some(obj =>
        (obj.time === showtime.time && obj.shift === showtime.shift));
    // 
    async function uploadShowTime(e) {
        e.preventDefault();
        console.log(showTimes);
        if (isTimeIncluded()) {
            setShowtime({ ...showtimeSchema });
            dispatch(setNotice(`Showtime "${showtime.time} ${showtime.shift}" is already available!`));
            return;
        }
        const { status, errors } = await validate(showtime, showtimeValidator);
        if (!status) return;
        setUploading(true);
        // println(showtime);
        const { data, error } = await supabase.from('showtimes').insert([showtime]);
        if (error) {
            dispatch(setNotice(error.message));
        }
        setUploading(false);
        // onUpload(showtime);
        setShowtime({ ...showtimeSchema });
        setOptions([]);
        queryClient.invalidateQueries(`show-${hallID}-${movie}`);
    }
    function generateMinutes(hour) {
        if (!hour || hour.includes(':')) {
            setOptions([]);
            return;
        }
        const _minutes = [15, 30, 45, 0].map(min => `${hour}:${min}`);
        setOptions(_minutes);
    }
    function handleChange(e) {
        let { name, value } = e.target;
        if (name === 'time') generateMinutes(e.target.value);
        else if (name === "ticket_price") value = parseFloat(value);
        setShowtime({
            ...showtime,
            [name]: value
        });
    }
    return (
        <div className="my-4">
            <h1 className="font-semibold">Add show time
                <Info data={"Add carefully! Cannot delete it later!"} />
            </h1>
            <form className="h-[2.2rem] flex flex-col row items-center justify-between" onSubmit={uploadShowTime}>
                <input className="h-full" required placeholder="HH:MM" list="showtime-hint" autoComplete="off"
                    type="text" name="time" value={showtime.time} onChange={handleChange} />
                <datalist id='showtime-hint'>
                    {
                        options.length > 0 &&
                        options.map((option, i) => (
                            <option key={i} value={option} />
                        ))
                    }
                </datalist>
                <select value={showtime.shift} name="shift" onChange={handleChange}>
                    <option value="0">AM</option>
                    <option value="1">PM</option>
                </select>
                <input className="h-full" required placeholder="NRs."
                    type="number" name="ticket_price" value={showtime.ticket_price} onChange={handleChange} />
                <button className="h-full flex items-center" type="submit">
                    {
                        !uploading ? "Add" : <Loader />
                    }
                </button>
            </form>
        </div>
    )
}