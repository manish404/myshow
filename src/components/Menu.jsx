import Link from "next/link";

function Menu({ url, name }) {
    return (
        <li className="menu-item">
            <Link aria-label={`${name} - myshow`} href={url}>
                {name}
            </Link>
        </li>
    )
}

export default Menu;