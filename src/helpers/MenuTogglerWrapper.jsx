import Header from "../components/layout/Header";
import Sidebar from "../pages/dashboard/components/layout/Sidebar";
import { useState } from "react";

export default function MenuTogglerWrapper() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <Sidebar
        showMenu={showMenu}
        toggleMenu={(bool) => setShowMenu(bool ?? !showMenu)}
      />
      <Header showMenu={showMenu} toggleMenu={() => setShowMenu(!showMenu)} />
    </>
  );
}
