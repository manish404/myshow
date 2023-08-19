import ArrowButton from "@/components/buttons/ArrowButton";
import { useAuthContext } from "@/contexts/AuthContext";
import { isUser } from "@/helpers/roleCheck";
import Link from "next/link";


function AccountView() {
    const { user: { user }, status: { loggedIn } } = useAuthContext();

    return (
        <>
            {loggedIn ?
                <div>
                    <h2 className="font-semibold text-xl">Welcome {user.name}!</h2>
                    <div>
                        <ul className="text-lg">
                            <li>
                                <span className="font-semibold">Email</span> : {user.email}
                            </li>
                            <li>
                                <span className="font-semibold">Plan</span> : {user.role}
                            </li>
                        </ul>
                    </div>
                    {isUser(user?.role) &&
                        <div className="bottom mt-10">
                            <ArrowButton text="Join Merchant" url="/admin/merchant/" position="front" />
                        </div>
                    }
                </div> :
                <h5>You're not loggedin</h5>
            }
        </>
    )
}

export default AccountView;