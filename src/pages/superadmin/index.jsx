import HomeButton from "@/components/buttons/HomeButton";
import MovieForm from "@/components/movies/MovieForm";
import SuperadminDashboard from "@/pages/superadmin/Dashboard";
import MerchantsView from "./MerchantsView";
import SPHallsView from "./SPHallsView";
import SPLoginForm from "./SPLoginForm";
import SPMoviesView from "./SPMoviesView";
import SuperAdminContextProvider, { useSuperAdmin } from "@/contexts/SuperadminContext"
import Link from "next/link";
import SetTrendings from "./SetTrendings";
import { useAuthContext } from "@/contexts/AuthContext";
import Notice from "@/components/Notice";

const menu = ['dashboard', 'set trendings', 'add movie', 'movies', 'halls', 'merchants'];

function SuperAdminNav() {
    const { user: { user } } = useAuthContext();
    const { view: { view, setView } } = useSuperAdmin();
    return (
        <ul className="w-[16%] left-view">
            <li className="menu-item my-2">
                <HomeButton />
            </li>
            {user && <li className="menu-item">
                <Link href={"/profile"}>
                    <img width={70} className="rounded-3xl" src={user?.picture} alt={user?.name} />
                </Link>
            </li>}
            {
                menu.map((item, i) => (
                    <li onClick={(e) => {
                        setView(e.target.dataset.view);
                        localStorage.setItem('superadmin-view', e.target.dataset.view);
                    }} key={i}
                        className={`my-2 menu-item capitalize rounded-sm px-1 py-2 ${view === item ? 'bg-gray-100' : ''}`}
                        data-view={item}>{item}</li>
                ))
            }
        </ul>
    )
}

function SuperAdminView() {
    const { view: { view } } = useSuperAdmin();
    return (
        <div className="w-[84%] right-view">
            {view === 'dashboard' && <SuperadminDashboard />}
            {view === 'add movie' && <MovieForm />}
            {view === 'set trendings' && <SetTrendings />}
            {view === 'movies' && <SPMoviesView />}
            {view === 'halls' && <SPHallsView />}
            {view === 'merchants' && <MerchantsView />}
        </div>
    )
}

function _SuperAdminPage() {
    const { status: { loggedIn } } = useSuperAdmin();
    return (
        <div className="m-4 row h-screen">
            {loggedIn ?
                <>
                    <SuperAdminNav />
                    <hr />
                    <SuperAdminView />
                </> :
                <SPLoginForm />
            }
        </div>
    )
}

export default function SuperadminPage() {
    return (
        <>
            <SuperAdminContextProvider>
                <_SuperAdminPage />
            </SuperAdminContextProvider>
            <Notice />
        </>)
}