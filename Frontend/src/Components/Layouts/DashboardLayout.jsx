import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

function DashboardLayout({ children, activeMenu }) {
  const profile = useSelector((store) => store.user);

  return (
    <div>
      {/* For small screen */}
      <Navbar activeMenu={activeMenu} />

      {profile.user && (
        <div className="flex">
          {/* Sidemenu for large screen */}
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Dashboard layout children */}
          <div className="grow">{children}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
