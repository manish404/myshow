import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setNotice } from "@/store/slices/common";
import { signInWithGoogle } from "@/db/auth";
import { useRouter } from "next/router";
import { useAuthContext } from "@/contexts/AuthContext";
import Logo from "./Logo";
import println from "@/helpers/print";
import { isDev } from "@/helpers/roleCheck";
import Image from "next/image";

function VR() {
    return (
        <hr className="w-[1px] h-3 mx-1 bg-gray-500" />
    )
}

function Header() {
    const [search_input, setSearchInput] = useState('');
    const { user: { user }, status: { loggedIn } } = useAuthContext();
    const dispatch = useDispatch();
    const router = useRouter();
    const [theme, setTheme] = useState('');
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
    function updateTheme(animation, theme) {
        setTheme(theme);
        document.documentElement.className = `${animation} ${theme}`;
    }
    function switchTheme() {
        const _theme = theme === 'light' ? 'dark' : 'light';
        const animation = theme === 'light' ? 'vanishIn' : 'vanishOut';
        localStorage.setItem('myshow-theme', _theme);
        updateTheme(animation, _theme);
    }
    // 
    useEffect(() => {
        const _theme = localStorage.getItem('myshow-theme') || 'light';
        const animation = _theme === 'light' ? 'vanishIn' : 'vanishOut';
        updateTheme(animation, _theme);
    }, []);
    // 
    return (
        <header className="header">
            <div className="logo">
                <Logo width={'w-[4rem]'} />
            </div>
            <div className="menu-section">
                <ul className="row mb-1">
                    <li className="text-xs"><Link href={"/offers"}>Offers</Link></li>
                    <VR />
                    <li className="text-xs"><Link href={"/about"}>About</Link></li>
                    <VR />
                    <li className="text-xs"><Link href={"/contact"}>Contact</Link></li>
                    <VR />
                    <li className="text-xs"><Link href={"/guide"}>Guide</Link></li>
                </ul>
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
                        <Link aria-label={"movies - myshow"} href={"/movies"}>
                            Movies <i className="bi bi-film text-green-500"></i>
                        </Link>
                    </li>
                    {loggedIn && <li className="menu-item">
                        <Link aria-label="saved - myshow" href={"/saved"}>
                            Saved <i className="bi bi-bookmark-fill text-green-500"></i>
                        </Link>
                    </li>}
                    <li className="menu-item">
                        <Link aria-label="halls - myshow" href={"/halls"}>
                            Halls <i className="bi bi-geo-alt text-green-500"></i>
                        </Link>
                    </li>
                    {!loggedIn &&
                        <li className="menu-item">
                            <button className="row items-center" onClick={async () => {
                                const DOMAIN = location.origin;
                                await signInWithGoogle(DOMAIN);
                            }}>
                                Sign In
                            </button>
                        </li>
                    }
                    {loggedIn &&
                        <>
                            <li className="menu-item">
                                <Link aria-label="profile - myshow" href={"/profile"}>
                                    {/* <i className="bi bi-person-circle "></i> */}
                                    <img width={30} className="rounded-3xl" src={user?.picture} alt={user?.name} />
                                </Link>
                            </li>
                        </>
                    }
                    <li>
                        <button onClick={switchTheme}>
                            <i className={`text-2xl ml-2 bi bi-${theme === 'light' ? 'brightness-low' : 'brightness-high'
                                }`}></i>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    )
}

export default Header;