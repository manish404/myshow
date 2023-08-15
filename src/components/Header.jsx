import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotice } from "@/store/slices/common";
import { logout, signInWithGoogle } from "@/db/auth";
import { useRouter } from "next/router";
import { useAuthContext } from "@/contexts/AuthContext";
import Logo from "./Logo";
import println from "@/helpers/print";
import { isDev } from "@/helpers/roleCheck";

function Header() {
    const [search_input, setSearchInput] = useState('');
    const { user: { user }, status: { loggedIn } } = useAuthContext();
    const dispatch = useDispatch();
    const router = useRouter();
    // 
    function search(e) {
        e.preventDefault();
        const sInput = search_input.split(':') || null;
        if (sInput.length != 2) {
            dispatch(setNotice('Search format -> type : input!'));
            return;
        }
        const [type, input] = sInput;
        router.push({
            pathname: '/search',
            query: { type: type.trim(), input: input.trim() }
        });
    }
    // 
    return (
        <header className="header">
            {/* image */}
            <div>
                <Logo width={'w-[3.5rem]'} />
            </div>
            {/* menu */}
            <ul className="menu-bar">
                <li className="menu-item">
                    <form className="row items-center" onSubmit={search}>
                        <i className="bi bi-search text-green-500 text-sm mr-1"></i>
                        <input onChange={(e) => setSearchInput(e.target.value)} value={search_input} type="text" name="search" placeholder="Search" list="search-hint" autoComplete="off" />
                        <datalist id="search-hint">
                            <option value="movie : " />
                            <option value="hall : " />
                        </datalist>
                    </form>
                </li>
                {isDev(user.role) &&
                    <>
                        {/* <li className="menu-item">
                            <button onClick={() => {
                                // dispatch(setNotice('hello'))
                                println(loggedIn, user);
                            }}> Test
                            </button>
                        </li> */}
                        {/* <li className="menu-item">
                            <Link href={"/payment"}>
                                Pay
                            </Link>
                        </li> */}
                    </>
                }
                <li className="menu-item">
                    <Link href={"/movies"}>
                        Movies
                    </Link>
                </li>
                <li className="menu-item">
                    <Link href={"/halls"}>
                        Halls
                    </Link>
                </li>
                <li className="menu-item">
                    <Link href={"/offers"}>
                        Offers
                    </Link>
                </li>
                {!loggedIn &&
                    <li className="menu-item">
                        <button onClick={async () => {
                            await signInWithGoogle();
                        }}>Sign In</button>
                    </li>
                }
                {loggedIn &&
                    <>
                        <li className="menu-item">
                            <Link href={"/profile"}>
                                {/* <i className="bi bi-person-circle "></i> */}
                                <img width={30} className="rounded-3xl" src={user?.picture} alt={user?.name} />
                            </Link>
                        </li>
                        <li>
                            <button onClick={async () => {
                                await logout();
                                router.push('/');
                            }}>
                                <i className="bi bi-box-arrow-right"></i>
                            </button>
                        </li>
                    </>
                }
            </ul>
        </header >
    )
}

export default Header;