import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { ResetPassword } from "./pages/reset-password.jsx";
import { Register } from "./pages/register.jsx";
import { Profile } from "./pages/profile.jsx";
import { ForumDetail } from "./pages/1forum.jsx";
import { Account } from "./pages/account.jsx";

import { Login } from "./pages/login.jsx";
import { Forums } from "./pages/forum.jsx";
import { Advertising } from "./pages/advertasing.jsx";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Invoices} from "./pages/invoices.jsx";
import { Payments} from "./pages/payments.jsx";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Profile />} path="/profile" />
                        <Route element={<Account />} path="/account" />
                        <Route element={<Forums />} path="/forums" />
                        <Route element={<Advertising />} path="/advertising" />
                        <Route element={<ForumDetail />} path="/forum/:forum_id" />
                        <Route element={<Register />} path="/register" />
                        <Route element={<Login />} path="/" /> 
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<ResetPassword />} path="/reset-password" />
                        <Route element={<Invoices />} path="/invoices" />
                        <Route element={<Payments />} path="/payments" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
