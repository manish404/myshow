function PaymentPage() {
    const URL = 'https://khalti.com/api/v2/payment/initiate/';
    async function initiate() {
        fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                public_key: ''
            })
        })
    }
    return (
        <div>
            <button type="button" onClick={(e) => {

            }}>Pay with khalti</button>
        </div>
    )
}

export default PaymentPage;