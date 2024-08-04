import supabase from "@/db/supabase";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const PAYMENT_STATUS = {
    COMPLETED: "Completed",
    PENDING: "Pending",
    CANCELED: "User canceled",
}

function PaymentSuccess() {
    const [paymentStatus, setPaymentStatus] = useState('');

    function getParamsAsJson(url) {
        let params = new URLSearchParams(url.search);
        let paramsJson = {};
        for (let [key, value] of params.entries()) {
            paramsJson[key] = value;
        }
        return paramsJson;
    }

    useEffect(() => {
        const data = getParamsAsJson(window.location);
        if (data?.pidx && data?.purchase_order_id) {
            (async () => {
                const response = await axios.post("/api/verify_payment", {
                    pidx: data.pidx
                });
                setPaymentStatus(response.data.status);
                // setPaymentStatus(PAYMENT_STATUS.CANCELED);
                if (response.data.status === PAYMENT_STATUS.COMPLETED) {
                    try {
                        const { data: updateRes, error: updateErr } = await supabase.from("bookings")
                            .update({ paymentID: response.data.pidx, booked: true })
                            .eq('id', data.purchase_order_id)
                    } catch (e) {
                        // console.log(e);
                    }
                }
            })();
        }
    }, []);
    return (
        <div className="w-screen h-screen grid place-items-center">
            <div className="flex flex-col items-center font-semibold">
                {
                    paymentStatus === PAYMENT_STATUS.COMPLETED &&
                    <>
                        <Image src={"/success.png"} width={100} height={100} />
                        PAYMENT STATUS SUCCESS
                    </>
                }
                {
                    paymentStatus === PAYMENT_STATUS.PENDING &&
                    <>
                        <Image src={"/pending.png"} width={100} height={100} />
                        PAYMENT STATUS PENDING
                    </>
                }
                {
                    paymentStatus === PAYMENT_STATUS.CANCELED &&
                    <>
                        <Image src={"/cancel.png"} width={100} height={100} />
                        PAYMENT STATUS CANCELED
                    </>
                }
            </div>
        </div>
    )
}

export default PaymentSuccess;