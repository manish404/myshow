function DashMenu({ children }) {
    return (
        <li className="menu-item rounded-sm px-1 py-2 my-2 capitalize">
            {children}
        </li>
    )
}

export default DashMenu;