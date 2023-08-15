import ArrowButton from "@/components/buttons/ArrowButton";
import { useAuthContext } from "@/contexts/AuthContext";
import Link from "next/link";


function ProfileView() {
    const { user: { user }, status: { loggedIn } } = useAuthContext();

    return (
        <>
            {loggedIn ?
                <div>
                    <h2 className="font-semibold">Welcome {user.name}!</h2>
                    <div>
                        <ul>
                            <li>
                                Email : {user.email}
                            </li>
                            <li>
                                Role : {user.role}
                            </li>
                        </ul>
                    </div>
                    <div className="bottom mt-10">
                        <ArrowButton text="Join Merchant" url="/admin/merchant/" position="front" />
                    </div>
                </div> :
                <h5>You're not loggedin</h5>
            }
        </>
    )
}

export default ProfileView;