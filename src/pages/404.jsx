import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";

function Custom404() {
    return (
        <div>
            <Head>
                <title>myshow.com |  Page Not Found | 404</title>
            </Head>
            <Header />
            <div className="full-page grid place-items-center">
                <div className="col items-center justify-center">
                    <p className="text-[10rem] font-bold text-yellow-500 ">
                        OOPS!
                    </p>
                    <p className="text-2xl font-semibold text-red-500">
                        Page Not Found!
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Custom404;