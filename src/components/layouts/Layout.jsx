import Footer from "../Footer";
import Header from "../Header";
import Notice from "../Notice";

function Layout(props) {
    return (
        <div className="col">
            <Header />
            <div className="px-20">
                {props.children}
            </div>
            <Notice />
            <Footer />
        </div>
    )
}

export default Layout;