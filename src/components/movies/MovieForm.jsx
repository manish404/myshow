import InputNotice from "@/components/inputs/InputNotice";
import { setInputNotice, setNotice } from "@/store/slices/common";
import { validate } from "@/validators";
import { movieSchema, movieValidator } from "@/schema/movie";
import supabase from "../../db/supabase";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "@/components/Loader";
import slugify from "slugify";
import { useRouter } from "next/router";
import println from "@/helpers/print";

function MovieForm() {
    // const { user: { user: { id: uid } } } = useAuthContext();
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [movie, setMovie] = useState({ ...movieSchema });
    const [localImage, setLocalImage] = useState('');
    const [uploadStatus, setUploadStatus] = useState(false);

    function handleChange(e) {
        let { name, value } = e.target;
        if (name === 'image') {
            value = e.target.files[0];
            const reader = new FileReader();

            reader.onload = () => {
                setLocalImage(reader.result);
            };

            reader.readAsDataURL(value);
        }
        setMovie({
            ...movie,
            [name]: value
        })

    }
    async function handleSubmit(e) {
        e.preventDefault();
        setUploadStatus(true);
        // (movie);
        const { status, errors } = await validate(movie, movieValidator);
        if (status) {
            // upload;
            const extension = movie.image.name.split('.').pop(),
                timestamp = new Date().getTime(),
                fileName = movie.image.name.replace(`.${extension}`, `_${timestamp}.${extension}`);
            const { data, error } = await supabase.storage
                .from('movie_images')
                .upload(`${fileName}`, movie.image);
            if (error) {
                setUploadStatus(false);
                dispatch(setNotice(`Movie upload failed! [image]`, error));
                return;
            }
            // println(data, error);
            movie.image = data.path;
            movie['slug'] = slugify(movie.title, { lower: true, strict: true });
            const fakeImage = movie.fake_image;
            delete movie.fake_image;

            const { data: movieData, error: movieUploadError } = await supabase
                .from('movies')
                .insert([movie]);

            if (movieUploadError) {
                // println(movieUploadError);
                setUploadStatus(false);
                dispatch(setNotice('Movie upload failed!'));
                setMovie({ ...movieSchema });
                // console.error('Error uploading movie object:', movieError.message);
                return;
            }
            setUploadStatus(false);
            dispatch(setNotice(`Movie "${movie.title}" uploaded!`));
            setMovie({ ...movieSchema });
            setLocalImage('');
        } else {
            setUploadStatus(false);
            errors.forEach(err => {
                dispatch(setInputNotice({ name: err.path[0], message: err.message }));
            })
        }
    }
    // 
    return (
        <form onSubmit={handleSubmit} className="movie-form">
            <div className="left">
                <div className="image input-row">
                    <input type="file" hidden name="image" ref={fileInputRef} onChange={handleChange} />
                    <img onClick={e => fileInputRef.current.click()}
                        className="pointer shadow-md rounded-sm" alt={movie.title}
                        src={localImage || movie.image || movie.fake_image} />
                    <InputNotice name="image" />
                </div>
            </div>
            <div className="right">
                <div className="title input-row">
                    <label htmlFor="title">Movie's Title</label>
                    <input className="" type="text" name="title" value={movie.title} onChange={handleChange} placeholder="Movie's Title" />
                    <InputNotice name={"title"} />
                </div>
                <div className="description input-row">
                    <label htmlFor="movie_description">Movie's Description</label>
                    <textarea rows={4} className="" type="text" name="description" value={movie.description} onChange={handleChange} placeholder="Movie's Description" >
                    </textarea>
                    <InputNotice name={"description"} />
                </div>
                <div className="release_date input-row">
                    <label htmlFor="release_date">Release Date</label>
                    <input className="pointer" type="date" name="release_date" value={movie.release_date} onChange={handleChange} />
                    <InputNotice name={"release_date"} />
                </div>
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

export default MovieForm;