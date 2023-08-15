import InputNotice from "./InputNotice";

function Input({ type, name, label }) {
    return (
        <div className="input-row">
            <label htmlFor={name}>{label}</label>
            <input type={type} name={name} />
            <InputNotice name={name} />
        </div>
    )
}

export default Input;