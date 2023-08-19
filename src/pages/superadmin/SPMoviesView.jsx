import MovieView from "@/components/movies/MovieView";
import { useEffect, useState } from "react";

function SPMoviesView() {
    const [input, setInput] = useState('');
    const [searchedString, setSearchedString] = useState('');
    // 
    return (
        <div>
            <div className="row justify-between">
                <label htmlFor="movie_name">Search Movie</label>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setSearchedString(input);
                }}>
                    <input value={input} onChange={(e) => {
                        const _input = e.target.value;
                        if (!_input) setSearchedString('');
                        setInput(_input);
                    }} className="w-[20rem] border-b-2 outline-none" type="search" name="movie_name" placeholder="Type Movie Name" />
                </form>
            </div>
            <>
                {
                    (searchedString && input) &&
                    <MovieView type={'search'} movie={searchedString} />
                }
            </>
        </div>
    )
}

export default SPMoviesView;