import { Outlet } from "react-router-dom";
import { Footer } from "./Wrappers/Footer";
import { Header } from "./Wrappers/Header";


export const Layout=()=>{

    return (
        <>
        <Header/>
        <Outlet/>
        <Footer/>
        </>
    );


};