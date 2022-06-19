import React, { useState } from "react";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation"
import Sidebar from "../Sidebar/Sidebar";

import "./Header.css"

export default function Header() {

    const [isSidebarOpened, setIsSidebarOpened] = useState(false);

    function closeSidebar() {
        setIsSidebarOpened(false);
    }
    return (
        <header className="header">
            <Logo />
            <Navigation />
            <Sidebar isOpened={isSidebarOpened} onClose={closeSidebar} />
            <button className="header__sidebar-button" type="button" onClick={() => setIsSidebarOpened(true)}>&#9776;</button>
        </header>
    );
};