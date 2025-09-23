import { Outlet } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/css/layout.css';
import MenuBar from "../../components/MenuBar.jsx";
function Layout(props) {
    return (
        <div>
            <MenuBar/>
            <section>
                <Outlet/>
            </section>
        </div>
    );
}

export default Layout;