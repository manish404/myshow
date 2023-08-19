import { useAuthContext } from "@/contexts/AuthContext";
import { isDev } from "@/helpers/roleCheck";

function TODO({ todos }) {
    const { user: { user: { role } } } = useAuthContext();
    return (
        <>
            {isDev(role) ?
                <div className="border-2 px-2 py-1 rounded-md text-sm">
                    <h1 className="font-semibold text-md">TODOs</h1>
                    <ul>
                        {todos.map((todo, i) => {
                            return (
                                <li className="capitalize" key={i}>{todo}</li>
                            )
                        })}
                    </ul>
                </div> :
                <></>
            }
        </>
    )
}

export default TODO;