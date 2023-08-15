import Link from "next/link";

function ArrowButton({ text, url, position }) {
    return (
        <Link className={`menu-item flex items-center ${position === 'back' ? 'float-left' : 'float-right'}`}
            href={url}>
            <span>
                {
                    (position && position === "back") &&
                    <>
                        {/* <i className="text-lg bi bi-arrow-left"></i> */}
                        <i className="text-lg bi bi-caret-left-fill"></i>
                    </>
                }
            </span>
            &nbsp;
            <span className="text-lg">{text}</span>
            {
                (position && position === "front") &&
                <>
                    &nbsp;
                    {/* <i className="text-lg bi bi-arrow-right"></i> */}
                    <i className="text-lg bi bi-caret-right-fill"></i>
                </>
            }
        </Link>
    )
}

export default ArrowButton;