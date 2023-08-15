import { useState } from "react";

function Info({ data }) {
    const [visibility, setVisibility] = useState(false);
    return (
        <div onMouseOver={() => setVisibility(true)} onMouseOut={() => setVisibility(false)}
            className="ml-4 text-sm inline items-center relative pointer"
        >
            <span>
                <i className="bi bi-question-circle"></i>
            </span>
            {
                visibility &&
                <span className="absolute w-max max-w-[20rem] text-[0.8rem] font-normal left-1 bottom-5 px-2 py-1 bg-slate-50 rounded-sm">
                    {data}
                </span>
            }
        </div>
    )
}

export default Info;