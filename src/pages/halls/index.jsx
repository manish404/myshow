import HallView from "@/components/hall/HallView";
import HallsView from "@/components/hall/HallsView";
import Layout from "@/components/layouts/Layout";
import Head from "next/head";
import { useRouter } from "next/router";

function HallPage() {
    const router = useRouter();
    const { id: hallID } = router.query;
    const LIMIT = 10;
    // 
    return (
        <Layout>
            <Head>
                <title>myshow.com | Halls</title>
            </Head>
            {
                hallID ?
                    <HallView hallID={parseInt(hallID)} />
                    :
                    <HallsView limit={LIMIT} />
            }
        </Layout>
    )
}

export default HallPage;