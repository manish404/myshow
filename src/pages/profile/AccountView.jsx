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
                        <div className="bottom mt-10 border border-green-100 rounded-md bg-green-100 w-full mx-auto">
                            <div className="py-5 col items-center">
                                <span className="mb-5">
                                    As a cinema owner, you've to fill up the merchant form. <br />
                                    Then you must visit the office with original pan-card and business's documents and Citizenship. <br />
                                    After payment and permission, you'll be given admin/merchant access.
                                </span>
                                <ArrowButton text="Become Merchant" url="/admin/merchant/" position="front" />
                            </div>
                        </div>
                    }
                </div> :
                <h5>You're not loggedin</h5>
            }
        </>
    )
}

export default AccountView;