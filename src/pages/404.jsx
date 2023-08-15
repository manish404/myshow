import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FullPage from "@/components/home/FullPage";
import Head from "next/head";

function Custom404() {
    return (
        <div className="col h-screen max-w-full justify-center">
            <Head>
                <title>myshow.com |  Page Not Found | 404</title>
            </Head>
            <Header />
            <FullPage>
                <div className="col items-center">
                    <p className="code text-9xl font-bold">
                        404
                    </p>
                    <p className="text-2xl font-semibold">
                        Page Not Found!
                    </p>
                </div>
            </FullPage>
            <Footer />
        </div>
    )
}

export default Custom404;