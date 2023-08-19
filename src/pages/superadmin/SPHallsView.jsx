import HallView from "@/components/hall/HallView";
import { useState } from "react";

function SPHallsView() {
    const [input, setInput] = useState('');
    const [searchedString, setSearchedString] = useState('');
    // 
    return (
        <div>
            <>
                <div className="row justify-between">
                    <label htmlFor="hall_name">Search Hall</label>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        setSearchedString(input);
                    }}>
                        <input value={input} onChange={(e) => {
                            const _input = e.target.value;
                            if (!_input) setSearchedString('');
                            setInput(_input);
                        }} className="w-[20rem] border-b-2 outline-none" type="search" name="hall_name" placeholder="Type Hall Name" />
                    </form>
                </div>
            </>
            <>
                {
                    searchedString &&
                    <HallView hallName={searchedString} />
                }
            </>
        </div>
    )
}

export default SPHallsView;