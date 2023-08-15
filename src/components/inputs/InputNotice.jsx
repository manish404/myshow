import { setInputNotice } from "@/store/slices/common";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function InputNotice({ name }) {
    const { inputNotice } = useSelector(state => state.common);
    const dispatch = useDispatch();
    useEffect(() => {
        const toID = setTimeout(() => {
            dispatch(setInputNotice({ name, message: '' }));
        }, 5000);
        return () => clearTimeout(toID);
    }, [inputNotice]);
    return (
        <>
            <p className="text-red-500 h-4 float-right text-sm">
                {inputNotice[name] &&
                    inputNotice[name]
                }
            </p>
        </>
    )
}

export default InputNotice;