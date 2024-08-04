import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import Layout from "@/components/layouts/Layout";
import Image from "next/image";
import Head from "next/head";

function FeatureCard({ title, description }) {
  return (
    <li className="feature-card relative">
      <i className="bi bi-bookmark-heart-fill text-red-500 absolute top-1 right-1 text-2xl"></i>
      <h1>{title}</h1>
      <span className="description">
        {description}
      </span>
    </li>
  )
}

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>myshow.com</title>
      </Head>
      <div className="px-10">
        <div className="row swashIn items-center full-page">
          <div className="relative">
            <Image priority={true} src='/trending-icon.png' alt="trending movie - myshow" className="absolute h-max top-3 right-[3%] w-[25%] swashIn" height={100} width={100} />
            <Image onContextMenu={(e) => { e.preventDefault() }} priority={true} className="mx-auto w-auto" src="/trending.jpg" alt="trending movie - myshow" height={1100} width={1100} />
          </div>
        </div>
        {/*  */}
        <div className="full-page grid place-items-center">
          <div>
            <h1 className="font-semibold col items-center">
              <span className="text-4xl text-green-500">Features</span>
            </h1>
            <ul className="features">
              <FeatureCard title="Booking Before/After release" description="User can book a movie either after release or before release (pre-planned booking)" />
              <FeatureCard title="Categorized booking" description="User can do all the pre planned booking for those movies which falls under specific categories." />
              <FeatureCard title="Book/Cancel at any time" description="User can book from home at any time and if is unable to visit hall, can cancel 1hour before show starts to get refund!" />
              <FeatureCard title="Offers" description="User can get/use various offers whereas hall-owners(admin) can create various offers. As well user can do affiliate and make money." />
            </ul>
          </div>
        </div>
        {/* payment partners */}
        <div className="full-page grid place-items-center">
          <div className="col items-center">
            <h1 className="font-semibold col items-center">
              <span className="text-4xl text-green-500">Payment Gateways</span>
            </h1>
            <ul className="row items-center justify-around w-full mt-10">
              <li className="slideLeftReturn">
                <Image priority={false} src="/khalti.png" alt="khalti - myshow" height={100} width={100} className="w-auto" />
              </li>
              <li className="slideLeftReturn col items-center">
                <Image priority={false} src="/esewa.png" alt="esewa - myshow" height={100} width={100} className="w-auto" />
              </li>
            </ul>
            <p>Others coming soon!</p>
          </div>
        </div>
        <div className="full-page grid place-items-center">
          <div className="col items-center w-1/2">
            <label htmlFor="subscriber_email" className="col items-center font-semibold mb-4">
              <span className="text-4xl text-green-500">Subscribe</span>
              <span>Get notified about upcoming movies!</span>
            </label>
            <form onSubmit={(e) => {
              e.preventDefault();
            }} className="h-[2.5rem] px-4 py-2 row items-center">
              <input type="email" name="subscriber_email" placeholder="Enter Email" className="w-[20rem] h-[2.5rem]" />
              <input type="submit" value="Subscribe" />
            </form>
          </div>
        </div>
        <div className="full-page">
          <FrequentlyAskedQuestions />
        </div>
      </div>
    </Layout >
  )
}
