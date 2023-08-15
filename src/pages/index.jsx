import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import Layout from "@/components/layouts/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>myshow.com</title>
      </Head>
      <div className="px-10">
        <div className="flex flex-row swashIn items-center full-page">
          <div className="relative">
            <img className="absolute h-max top-3 right-[3%] w-[25%] swashIn" src="trending-icon.png" alt="trending movie - neerphool - myshow" />
            <img className="mx-auto" src="trending.jpg" alt="trending movie - neerphool - myshow" />
          </div>
        </div>
        {/*  */}
        <div className="full-page grid place-items-center">
          <div>
            <h1 className="font-semibold col items-center">
              <span className="text-5xl text-green-500">Features</span>
              <span className="text-base">Coming Soon!</span>
            </h1>
            <ul className="row features">
              <li className="feature-card">
                <h1>Booking Before/After release</h1>
                <span className="description">
                  User can book a movie either after release or before release (pre-planned booking)
                </span>
              </li>
              <li className="feature-card">
                <h1>Categorized booking</h1>
                <span className="description">
                  User can do all the pre planned booking for those movies which falls under specific categories.
                </span>
              </li>
              <li className="feature-card">
                <h1>Book/Cancel at any time</h1>
                <span className="description">
                  User can book from home at any time and if is unable to visit hall, can cancel 1hour before show starts to get refund!
                </span>
              </li>
              <li className="feature-card">
                <h1>Offers</h1>
                <span className="description">
                  User can get/use various offers whereas hall-owners(admin) can create various offers. As well user can do affiliate and make money.
                </span>
              </li>
            </ul>
          </div>
        </div>
        {/* payment partners */}
        <div className="full-page grid place-items-center">
          <div className="col items-center">
            <h1 className="font-semibold col items-center">
              <span className="text-5xl text-green-500">Payment Gateways</span>
              {/* <span className="text-base">Book/Cancel at any time!</span> */}
            </h1>
            <ul className="row scale-50">
              <li className="slideLeftReturn"><img src="khalti.png" alt="" /></li>
              <li className="slideLeftReturn"><img src="esewa.png" alt="" /></li>
            </ul>
          </div>
        </div>
        <div className="full-page">
          <FrequentlyAskedQuestions />
        </div>
      </div>
    </Layout >
  )
}
