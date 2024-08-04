import Layout from "@/components/layouts/Layout";
import Link from "next/link";

function AuthTag() {
    return <span className="text-xs bg-yellow-500 py-[2px] px-[7px] rounded-md">Signin required</span>
}

function ComingSoon() {
    return <span className="text-xs bg-yellow-500 py-[2px] px-[7px] rounded-md">Coming Soon!</span>
}

function PageLink({ url, name }) {
    return (
        <li className="text-sm row items-center mx-1 font-semibold text-green-500 underline">
            <Link href={url}>{name}</Link>
        </li>
    )
}

function Path({ paths }) {
    return (
        <span className="font-semibold">&nbsp; "{paths.join(' > ')}"</span>
    )
}

function GuidePage() {
    return (
        <Layout>
            <div className="row justify-between text-[0.8rem] pointer">
                <ul className="user guide">
                    <h1>User</h1>
                    <li className="row">Browse running/upcoming movies from <PageLink url={"/movies"} name={"Movies"} />.</li>
                    <li className="row">Browse halls movies from <PageLink url={"/halls"} name={"Halls"} />.</li>
                    <li>Can search movie/hall.</li>
                    <AuthTag />
                    <li className="row">Save/Bookmark Movie, can find them in <PageLink url={"/saved"} name={"Saved"} />.</li>
                    <li>Can see his/her bookings from path <Path paths={['profile', 'Bookings']} />.</li>
                    <li>Can do tickets booking using path <Path paths={['halls', 'hall', 'showtime']} />.</li>
                    <ComingSoon />
                    <li>Use offers in booking.</li>
                    <li>Online payment via esewa or khalti.</li>
                    <li>Can give feedbacks.</li>
                </ul>
                <ul className="admin guide">
                    <h1>Admin</h1>
                    <li>Must fill-up merchant form.</li>
                    <li>Submit personal and company documents and pan card to activate account.</li>
                    <li>Can add/edit/delete their hall.</li>
                    <li>Can add showtime, change running-movie in hall.</li>
                    <li>Can see bookings made in their halls.</li>
                    <ComingSoon />
                    <li>See/Print monthly report, hallwise report.</li>
                    <li className="col">Dashboard displaying
                        <span className="ml-4">Cashflow, Busy Halls, Recurrent users and many more.</span>
                    </li>
                    <li>See user feedbacks.</li>
                </ul>
                <ul className="superadmin guide">
                    <h1>Superadmin</h1>
                    <li>Set trending movies (upto 4).</li>
                    <li>Add/edit/delete upcoming movie.</li>
                    <li>Search any movie/hall details.</li>
                    <li>Activate or deactivate merchant/admin accounts.</li>
                    <ComingSoon />
                    <li>See reports</li>
                    <li>Access to messages</li>
                </ul>
            </div>
        </Layout>
    )
}

export default GuidePage;