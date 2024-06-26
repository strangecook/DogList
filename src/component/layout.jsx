import { Outlet } from "react-router-dom";
import LoginNavi from "../NaviBar/LoginNavi";

export default function Layout(){
    return (
        <>
            <LoginNavi />
            <Outlet />
        </>
    )
}