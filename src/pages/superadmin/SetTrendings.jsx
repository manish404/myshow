import Image from "next/image";
import { useRef, useState } from "react";

function ImageCard({ url }) {
    const [image, setImage] = useState(url);
    const fileRef = useRef(null);
    return (
        <>
            {
                image ?
                    <li className="pointer relative">
                        <Image alt="myshow" src={image} width={480} height={480} priority={true} />
                        <button onClick={() => {
                            setImage('');
                        }}>
                            <i className="text-xl text-black bi bi-x-lg absolute right-8 top-0"></i>
                        </button>
                    </li> :
                    <li className="pointer relative"
                        onClick={() => {
                            fileRef.current.click();
                        }}>
                        <input hidden type="file" ref={fileRef} accept=".png,.jpg,.jpeg" />
                        <i className="text-5xl bi bi-plus absolute top-[40%] left-1/2"></i>
                    </li>
            }
        </>
    )
}

function SetTrendings() {
    return (
        <>
            <h1 className="font-semibold text-xl"> Set Trendings Movies </h1>
            <div >
                <ul className="grid grid-cols-2">
                    <ImageCard url={"/trending.jpg"} />
                    <ImageCard url={"/trending.jpg"} />
                    <ImageCard url={"/trending.jpg"} />
                    <ImageCard />
                </ul>
            </div>
        </>
    )
}

export default SetTrendings;