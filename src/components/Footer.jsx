import Link from "next/link";
import Logo from "./Logo";
import Menu from "./Menu";

function SocialIcon({ icon }) {
    return (
        <>
            <Link aria-label={icon} href="/" target="_blank">
                <i className={`bi bi-${icon}`}></i>
            </Link>
        </>
    )
}

function Footer() {
    return (
        <div className="footer">
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
                        <li className="row items-center justify-between">
                            <div>
                                <i className="bi bi-geo-alt"></i>
                                <span className="font-semibold text-green-500 mx-1">Location :</span>
                            </div>
                            <span>Tulsipur-Dang, Nepal</span>
                        </li>
                        <li className="row items-center justify-between">
                            <div>
                                <i className="bi bi-envelope"></i>
                                <span className="font-semibold text-green-500 mx-1">Email :</span>
                            </div>
                            <span>contact@myshow.com</span>
                        </li>
                        <li className="row items-center justify-between">
                            <div>
                                <i className="bi bi-telephone"></i>
                                <span className="font-semibold text-green-500 mx-1">Telephone :</span>
                            </div>
                            <span>082-5*****</span>
                        </li>
                        <li className="row items-center justify-between">
                            <div>
                                <i className="bi bi-whatsapp"></i>
                                <span className="font-semibold text-green-500 mx-1">Whatsapp :</span>
                            </div>
                            <span>98********</span>
                        </li>
                    </ul>
                </div>
                <div className="row">
                    <div>
                        <ul>
                            <Menu url={"/movie_reviews"} name={"Movie reviews"} />
                            <Menu url={"/hall_reviews"} name={"Hall reviews"} />
                            <Menu url={"/rating?type='movie'"} name={"Movie Rating"} />
                            <Menu url={"/rating?type='hall'"} name={"Hall Rating"} />
                        </ul>
                    </div>
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
                            <Menu url={"/jobs"} name={"Jobs"} />
                        </ul>
                    </div>
                </div>
            </div>
            {/* bottom */}
            <div className="mt-[8rem]">
                <div className="copyright">
                    <hr />
                    <span className="w-[40%] text-sm">
                        Copyright &copy;
                        <span className="text-green-500 font-semibold">myshow</span>@2023;
                    </span>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default Footer;