function FullPage({ children }) {
    return (
        <div className="grid place-items-center h-[88vh] my-4 w-[88vw] overflow-x-hidden overflow-y-auto">
            {children}
        </div>
    )
}

export default FullPage;