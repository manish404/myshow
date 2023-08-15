import axios from 'axios'
import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Khalti = () => {
    const khaltiob = {
        "return_url": "http://localhost:3000/",
        "website_url": "http://localhost:3000/",
        "amount": 1300,
        "purchase_order_id": "4",
        "purchase_order_name": "test",

        "amount_breakdown": [
            {
                "label": "Mark Price",
                "amount": 1000
            },
            {
                "label": "VAT",
                "amount": 300
            }
        ],
        "product_details": [
            {
                "identity": "1234567890",
                "name": "Khalti logo",
                "total_price": 1300,
                "quantity": 1,
                "unit_price": 1300
            }
        ]

    }
    const payment = async () => {

        const rs = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', khaltiob, {
            headers: {
                'Authorization': "Key c3349ccb7bd94bd0bd2a167f707c18c2"
            }
        });
        if (rs.status === 200) {
            window.location.href = rs.data.payment_url;
        }

        console.log(rs);
        console.log('Res data: ', rs.data);

    }
    return (
        <div>
            <ToastContainer />
            <h1 className='text-center'>Khalti </h1>
            <button className='btn allbtn' onClick={() => { payment() }}>Payment Khalti</button>
        </div>
    )
}

export default Khalti