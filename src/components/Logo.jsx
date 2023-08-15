import Image from "next/image";
import Link from "next/link";

function Logo({ width }) {
    return (
        <Link href={"/"} className="logo">
            <Image onContextMenu={(e) => {
                e.preventDefault();
            }} className={width || 'w-[3.5rem]'} alt="myshow" src="/logo.svg" width={100} height={100} priority />
        </Link>
    )
}

export default Logo;