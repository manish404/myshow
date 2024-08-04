import { useAuthContext } from "@/contexts/AuthContext";
import { isAdmin } from "@/helpers/roleCheck";
import moment from "moment";

function HallInfo({ hall }) {
    const { user: { user: { id, role } } } = useAuthContext();
    return (
        <div className="mt-2">
            <h1 className="font-semibold text-md row items-end justify-between capitalize">
                <span className="text-2xl">{hall?.name}</span>
                &nbsp;
                <span className="row ml-4">
                    <i className="bi bi-geo-alt-fill text-sm"></i>
                    &nbsp;
                    <span className="text-sm">{hall?.cities?.name}</span>
                </span>
                {
                    (isAdmin(role) && hall?.created_by === id) &&
                    <button><i className="bi bi-trash"></i> Remove</button>
                }
            </h1>
            <h1 className="font-semibold text-base mt-4 capitalize">
                Currently showing : &nbsp;
                {
                    hall?.movies?.title ?
                        <>
                            {hall?.movies?.title} &nbsp;
                            (
                            <span className="text-[0.85rem]">
                                {moment(hall?.movies?.release_date).calendar()}
                            </span>
                            )
                        </> :
                        <>No movie</>
                }
            </h1>
        </div>
    )
}

export default HallInfo;