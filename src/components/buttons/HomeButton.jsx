import Image from "next/image";
import Link from "next/link";

function HomeButton() {
    return (
        <Link aria-label="myshow" href={"/"} className="home">
            <Image onContextMenu={(e) => {
                e.preventDefault();
            }} className={'w-[1rem]'} alt="myshow" src="/home.svg" width={100} height={100} priority />
        </Link>
    )
}

export default HomeButton;