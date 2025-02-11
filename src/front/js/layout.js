import React, {useEffect} from "react";
import { BrowserRouter, Route, Routes, useLocation, matchPath, useNavigate} from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
 
import { ForgotPassword } from "./pages/forgot-password.jsx";
import { ResetPassword } from "./pages/reset-password.jsx";
import { Register } from "./pages/register.jsx";
import { Profile } from "./pages/profile.jsx";
import { ForumDetail } from "./pages/1forum.jsx";
import { UserAccountSettings } from "./pages/useraccountsettings.jsx";
 
import { Login } from "./pages/login.jsx";
import { Forums } from "./pages/forum.jsx";
import { Advertising } from "./pages/advertasing.jsx";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Invoices } from "./pages/invoices.jsx";
import { Subscription } from "./pages/subscription.jsx";
import { Invoice } from "./pages/invoice.jsx";
 
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { SideBar } from "./component/sideBar.jsx";
 
const LayoutContent = () => {
    const location = useLocation();
    const navigate = useNavigate();
 
    const hideSidebarRoutes = [
        "/",
        "/register",
        "/forums",
        "/advertising",
        "/forgot-password"
    ];
   
    const dynamicRoutes = ["/forum/:forum_id", "/reset-password/:token"];
   
    const showSidebar = !(
        hideSidebarRoutes.includes(location.pathname) ||
        dynamicRoutes.some(route => matchPath(route, location.pathname))
    );
 
    const isAuthenticated = () => !!sessionStorage.getItem("accessToken");
 
    const protectedRoutes = ["/", "/register", "/forgot-password"];
    const dynamicProtectedRoutes = ["/reset-password/:token"];
 
    useEffect(() => {
        if (isAuthenticated()) {
            const isProtected =
                protectedRoutes.includes(location.pathname) ||
                dynamicProtectedRoutes.some(route => matchPath(route, location.pathname));
 
            if (isProtected) {
                navigate("/profile");
            }
        }
    }, [location.pathname]);
 
    return (
        <div className="d-flex flex-column min-vh-100">
            <Navbar />
            <div className="d-flex flex-grow-1">
                {showSidebar && <SideBar />}
                <div className="content flex-grow-1 p-3">
                    <Routes>
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<UserAccountSettings />} path="/accountsettings" />
                        <Route element={<Forums />} path="/forums" />
                        <Route element={<Advertising />} path="/advertising" />
                        <Route element={<ForumDetail />} path="/forum/:forum_id" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/" />
                        <Route element={<h1>Not found!</h1>} path="*" />
                        <Route element={<ResetPassword />} path="/reset-password/:token" />
                        <Route element={<ForgotPassword />} path="/forgot-password" />
                        <Route element={<Invoices />} path="/invoices" />
                        <Route element={<Subscription />} path="/subscription" />
                        <Route element={<Invoice />} path="/invoice/:id_invoice" />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    );
};
 
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
 
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
 
    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <LayoutContent />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};
 
export default injectContext(Layout);