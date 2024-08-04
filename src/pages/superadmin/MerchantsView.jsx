import { updateMerchantStatus } from "@/db/merchants";
import println from "@/helpers/print";
import { useMerchants } from "@/hooks/merchantHooks";
import { setNotice } from "@/store/slices/common";
import { useState } from "react";
import { useDispatch } from "react-redux";

function MerchantRow({ merchant }) {
    const [active, setActive] = useState(merchant?.active);
    const dispatch = useDispatch();
    return (
        <tr>
            <td>{merchant?.business_name}</td>
            <td>{merchant?.business_address}</td>
            <td>{merchant?.pan_number}</td>
            <td>{merchant?.start_date}</td>
            <td>{merchant?.full_name}</td>
            <td>{merchant?.email}</td>
            <td>{merchant?.address}</td>
            <td>{merchant?.phone}</td>
            <td>
                <select className="w-max" name="active" value={active}
                    onChange={async (e) => {
                        const { value } = e.target;
                        const res = await updateMerchantStatus(merchant?.id, merchant?.email, value);
                        const updatedStatus = !active ? 'activated' : 'deactivated';
                        if (res) {
                            setActive(state => !state);
                            dispatch(
                                setNotice(`Merchant has been ${updatedStatus}!`));
                        }
                    }}>
                    <option value={true} selected={active} >Activate</option>
                    <option value={false} selected={!active}>Deactivate</option>
                </select>
            </td>
        </tr>
    )
}

function MerchantsTable({ merchants }) {
    return (
        <table className="w3-table w3-bordered text-[0.9rem] w-full">
            <thead>
                <tr>
                    <td>Business Name</td>
                    <td>Address</td>
                    <td>Pan No.</td>
                    <td>Start Date</td>
                    <td>Owner's Name</td>
                    <td>Email</td>
                    <td>Address</td>
                    <td>Phone</td>
                    <td>Status</td>
                </tr>
            </thead>
            <tbody>
                {merchants.map((merchant, i) => {
                    return <MerchantRow merchant={merchant} key={i} />
                })}
            </tbody>
        </table>
    )
}

function MerchantsView() {
    const { data: merchants, error } = useMerchants();
    return (
        <>
            <h1 className="font-semibold text-xl">Merchants or Admins</h1>
            {
                merchants ?
                    <MerchantsTable merchants={merchants} /> :
                    <h1>No merchants found!</h1>
            }
        </>
    )
}

export default MerchantsView;