import { useReactToPrint } from "react-to-print";
import Bill from "./Bill";
import { useRef } from "react";
import { ButtonsSecion } from "../ButtonsSecion";
import { Button } from "@material-tailwind/react";

function BillsSection({ bill, onClose }) {
    const billRef = useRef(null);

    const printBill = useReactToPrint({
        content: () => billRef.current,
    });

    return (
        <>
            {bill &&
                <div className="flex flex-col gap-y-2 w-full">
                    <div ref={billRef} className="my-4 grid grid-cols-2 items-center gap-x-5 mx-3">
                        <Bill bill={bill} />
                        <Bill bill={bill} />
                    </div>
                    <ButtonsSecion>
                        <Button onClick={printBill} variant="outlined">Print Bill!</Button>
                        <Button onClick={onClose} variant="outlined">Close</Button>
                    </ButtonsSecion>
                </div>
            }
        </>
    )
}

export default BillsSection;