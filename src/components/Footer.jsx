import Link from "next/link";
import Logo from "./Logo";

function SocialIcon({ icon }) {
    return (
        <>
            <Link href="/" target="_blank">
                <i className={`bi bi-${icon}`}></i>
            </Link>
        </>
    )
}

function Menu({ url, name }) {
    return (
        <li className="menu-item">
            <Link href={url}>
                {name}
            </Link>
        </li>
    )
}

function Footer() {
    return (
        <div className="col mt-4 bg-gray-100 px-20 py-[10rem] text-base">
            {/* top */}
            <div className="row justify-between">
                <div className="col justify-center">
                    <Logo width={'w-[7rem]'} />
                    <ul className="row mt-4 justify-between">
                        <li><SocialIcon icon="facebook" /></li>
                        <li><SocialIcon icon="youtube" /></li>
                        <li><SocialIcon icon="twitter" /></li>
                    </ul>
                </div>
                <div className="max-w-4xl w-max overflow-x-auto">
                    <ul>
                        <li className="flex flex-row"><i className="bi bi-geo-alt"></i>
                            <span className="font-semibold text-green-500 mx-1">Location :</span> Tulsipur-Dang, Nepal
                        </li>
                        <li className="flex flex-row"><i className="bi bi-envelope"></i>
                            <span className="font-semibold text-green-500 mx-1">Email :</span> contact@myshow.com
                        </li>
                        <li className="flex flex-row"><i className="bi bi-telephone"></i>
                            <span className="font-semibold text-green-500 mx-1">Tel :</span> 082-5*****
                        </li>
                        <li className="flex flex-row"><i className="bi bi-whatsapp"></i>
                            <span className="font-semibold text-green-500 mx-1">Whatsapp :</span> 98********
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div>
                        <ul>
                            <Menu url={"/terms_conditions"} name={"Terms and Conditions"} />
                            <Menu url={"/return_policy"} name={"Return Policy"} />
                        </ul>
                    </div>
                    <div>
                        <ul className="col">
                            <Menu url={"/about"} name={"About"} />
                            <Menu url={"/features"} name={"Features"} />
                            <Menu url={"/faqs"} name={"FAQs"} />
                            <Menu url={"/contact"} name={"Contact"} />
                            <Menu url={"/blogs"} name={"Blogs"} />
                        </ul>
                    </div>
                    <div>
                        <ul className="col">
                            <Menu url={"/offers"} name={"Offers"} />
                            <Menu url={"/coupons"} name={"Coupons"} />
                            <Menu url={"/affiliate"} name={"Affiliate"} />
                            <Menu url={"/careers"} name={"Careers"} />
                        </ul>
                    </div>
                </div>
            </div>
            {/* bottom */}
            <div>
                <div className="text-sm w-full row justify-center items-center">
                    <hr className="w-full" />
                    <span className="w-[40%] text-base">
                        Copyright &copy;
                        <span className="text-green-500 font-semibold">myshow</span>@2023;
                    </span>
                    <hr className="w-full" />
                </div>
            </div>
        </div >
    )
}

// setdata((pre) => {
//     return { ...pre, [name]: value }
//   })

export default Footer;