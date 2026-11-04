import { Outlet } from "react-router-dom";
import UtilityBar from "./UtilityBar.jsx";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Breadcrumb from "@shared/components/ui/Breadcrumb.jsx";

export default function Layout() {
  return (
    <>
      <UtilityBar />
      <Navbar />
      <Breadcrumb />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
