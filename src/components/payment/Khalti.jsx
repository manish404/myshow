import println from '@/helpers/print';
import axios from 'axios';

const Khalti = () => {
    /**
     * amount: summed and converted into paisa,
     * order_id: generate_id,
     * order_name : order_order_id,
     * product_details: [{id, name, price, quantity, price(in paisa)}]
     */
    const khaltiob = {
        "return_url": "http://localhost:3000/booking",
        "website_url": "http://localhost:3000/",
        "amount": 1300,
        "purchase_order_id": "4",
        "purchase_order_name": "test",
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
        const url = 'https://khalti.com/api/v2/payment/initiate/';
        // const url =  'https://a.khalti.com/api/v2/epayment/initiate/';
        const res = await axios.post(url, khaltiob, {
            headers: {
                'Authorization': "Key c3349ccb7bd94bd0bd2a167f707c18c2"
            }
        });
        if (res.status === 200) {
            window.location.href = res.data.payment_url;
        }
        println(res);
        println('Res data: ', res.data);
        // now verify payment!!!
    }
    return (
        <div>
            <button className='btn allbtn' onClick={() => { payment() }}>Payment Khalti</button>
        </div>
    )
}

export default Khalti