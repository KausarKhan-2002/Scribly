import { HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { useState } from "react";
import Logo from "../../Shared/Logo";

function Navbar({ activeMenu }) {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="flex gap-5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <button
        className="block lg:hidden text-black"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <Logo />

      {/* Sidemenu for small screen */}
      {openSideMenu && (
        <div className="fixed top-[61px] lg:hidden -ml-4">
          <SideMenu />
        </div>
      )}
    </div>
  );
}

export default Navbar;
