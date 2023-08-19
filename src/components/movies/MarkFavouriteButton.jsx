import { markMovieAsFavourite, removeFavourite } from "@/db/movies";
import { setNotice } from "@/store/slices/common";
import { useState } from "react";
import { useDispatch } from "react-redux";

function MarkFavouriteButton({ userId, movieId, isLiked = false }) {
    const [saved, setSaved] = useState(isLiked);
    const dispatch = useDispatch();
    return (
        <button aria-label="Save" onClick={async (e) => {
            e.stopPropagation();
            e.preventDefault();
            let res;
            if (isLiked && saved) res = await removeFavourite(userId, movieId);
            else res = await markMovieAsFavourite(userId, movieId);
            if (res) {
                dispatch(setNotice(`Movie has been ${!saved ? 'saved' : 'unsaved'}!`));
                setSaved(state => !state);
            }
        }}>
            <i className={`bi bi-${saved ? 'bookmark-fill text-green-500' : 'bookmark'}`}></i>
        </button>
    )
}

export default MarkFavouriteButton;