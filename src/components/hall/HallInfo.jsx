import moment from "moment";

function HallInfo({ hall }) {
    return (
        <div className="mt-2">
            <h1 className="font-semibold text-md row items-end capitalize">
                <span className="text-2xl">{hall?.name}</span>
                &nbsp;
                <span className="row ml-4">
                    <i className="bi bi-geo-alt-fill text-sm"></i>
                    &nbsp;
                    <span className="text-sm">{hall?.cities?.name}</span>
                </span>
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