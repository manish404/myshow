function Bill({ bill }) {
    return (
        <div className="border border-black flex flex-col overflow-hidden"
            onContextMenu={(e) => { e.preventDefault() }}>
            <div className="bg-slate-100">
                <div className="flex justify-end mr-3">
                    <h6 className="text-sm">Date : {bill.date}</h6>
                </div>
                <h1 className="capitalize font-semibold text-2xl text-center">{bill.hall}</h1>
                <h3 className="text-center">{bill.address}</h3>
            </div>
            <div className="p-3">
                <div className="flex justify-between items-center">
                    <h2 className="capitalize font-semibold">Movie : {bill.movie}</h2>
                    <h2 className="capitalize font-semibold">Price : Rs. {bill.price}</h2>
                </div>
                <h4 className="font-semibold">Show time : {bill.show_time}</h4>
                <div>
                    <span className="font-semibold">Seats : {bill?.booked_seats?.length || ''}</span>
                    <ol className="flex flex-wrap">
                        {
                            (bill?.booked_seats || []).map((seat, si) => (
                                <li className="ml-2 bg-gray-200 w-max p-1 m-0.5 rounded-sm uppercase" key={si}>{seat}</li>
                            ))
                        }
                    </ol>
                </div>
            </div>
            <div className="p-3 flex flex-col items-end justify-end relative">
                <h6>Booked by</h6>
                <div>
                    <h3>{bill.user?.name}</h3>
                    <h6>{bill.user?.contact || "Contact"}</h6>
                </div>
                <div className="absolute top-6">
                    {
                        bill?.paid === true ?
                            <i className="bi bi-check-lg text-green-500 opacity-70">Paid</i>
                            :
                            <i className="bi bi-x-lg text-red-500 opacity-70">Not Paid</i>
                    }
                </div>
            </div>
        </div>
    )
}

export default Bill;