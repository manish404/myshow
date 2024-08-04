import axios from "axios";

function openPaymentWindow(url) {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const windowFeatures = `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=yes`;
    const paymentWindow = window.open(url, 'PaymentWindow', windowFeatures);
    paymentWindow.focus();
}


export async function makePayment(origin, purchase_order_id, purchase_order_name, amount) {
    amount = amount * 100;// converted to paisa
    try {
        const response = await axios.post("/api/handle_payment", {
            return_url: origin + '/payment/success',
            website_url: origin,
            purchase_order_id,
            purchase_order_name,
            amount,
        });
        if (response.data?.pidx && response.data?.payment_url) {
            window.open(response.data.payment_url, "_blank");
        }
    } catch (e) { }
}