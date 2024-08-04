export function ButtonsSecion({ children, className }) {
    return (
        <div className={`w-full h-full flex justify-end gap-x-1 ${className}`}>
            {children}
        </div>
    )
}