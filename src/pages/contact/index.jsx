import Layout from "@/components/layouts/Layout";
import println from "@/helpers/print";
import Head from "next/head";
import { useState } from "react";

const userMessageSchema = {
    full_name: '',
    email: '',
    message: ''
};

function ContactPage() {
    const [message, setMessage] = useState({ ...userMessageSchema });
    function updateMessage(e) {
        const { name, value } = e.target;
        setMessage({ ...message, [name]: value });
    }
    async function sendUserMessage(e) {
        e.preventDefault();
        // requires validation here;
        println(message);
        setMessage({ ...userMessageSchema });
    }
    return (
        <Layout>
            <Head>
                <title>myshow.com | Contact</title>
            </Head>
            <div className="flex flex-col w-1/2 mx-auto">
                <h1 className="text-2xl font-semibold">Contact Us!</h1>
                <form onSubmit={sendUserMessage} method="POST" className="contact-form">
                    <input value={message?.full_name} type="text" name="full_name" placeholder="Full Name" min={5} max={30} required onChange={updateMessage} />
                    <input value={message?.email} type="email" name="email" placeholder="Email Address" min={10} max={30} required onChange={updateMessage} />
                    <textarea value={message?.message} name="message" placeholder="Message" minLength={20} maxLength={100} required onChange={updateMessage}></textarea>
                    <input type="submit" value="Send" />
                </form>
            </div>
        </Layout>
    )
}

export default ContactPage;