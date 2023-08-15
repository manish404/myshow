import HomeButton from "@/components/buttons/HomeButton";
import MovieForm from "@/components/movies/MovieForm";
import SPHallsView from "@/components/superadmin/SPHallsView";
import SPLoginForm from "@/components/superadmin/SPLoginForm";
import SPMoviesView from "@/components/superadmin/SPMoviesView";
import SuperAdminContextProvider, { useSuperAdmin } from "@/contexts/SuperadminContext"
import Link from "next/link";

const menu = ['dashboard', 'add-movie', 'movies', 'halls', 'merchants'];

function SuperAdminNav() {
    const { view: { setView } } = useSuperAdmin();
    return (
        <ul className="w-[20%] left-view">
            <li className="menu-item my-2">
                <HomeButton />
            </li>
            {
                menu.map((item, i) => (
                    <li onClick={(e) => {
                        setView(e.target.dataset.view);
                        localStorage.setItem('superadmin-view', e.target.dataset.view);
                    }} key={i} className="my-2 menu-item capitalize" data-view={item}>{item}</li>
                ))
            }
        </ul>
    )
}

function Dashboard() { return (<>Dashboard - All Stats</>) }
function SPMerchantsView() { return (<>Merchants - All merchants with pagination and searchbar.</>) }

function SuperAdminView() {
    const { view: { view } } = useSuperAdmin();
    return (
        <div className="w-[80%] right-view">
            {view === 'dashboard' && <Dashboard />}
            {view === 'add-movie' && <MovieForm />}
            {view === 'movies' && <SPMoviesView />}
            {view === 'halls' && <SPHallsView />}
            {view === 'merchants' && <SPMerchantsView />}
        </div>
    )
}

function SuperAdminPage() {
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

export default () =>
    <SuperAdminContextProvider>
        <SuperAdminPage />
    </SuperAdminContextProvider>