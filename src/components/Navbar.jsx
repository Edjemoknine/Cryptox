import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setActive(false);
  }, [location]);
  return (
    <div className="nav-container">
      <div className="navbar container relative mx-auto flex  items-center md:p-1 p-6 justify-between">
        <div className="logo-container text-2xl text-white font-bold">
          <Link to="/">CRYPTOX</Link>
        </div>

        <div
          className={
            active
              ? "menu flex text-sm  justify-center items-center flex-col md:flex-row md:relative md:bg-inherit absolute right-0 top-[120%] transition-all duration-300 rounded-md bg-blue-950 w-[300px] text-white p-6 z-10  gap-8"
              : "menu flex text-sm justify-center items-center flex-col md:flex-row md:relative md:bg-inherit absolute right-0 -top-[600%] transition-all duration-300 rounded-md bg-blue-950 w-[300px] text-white p-6 z-10  gap-8"
          }
        >
          <div className={location.pathname === "/" && " active"}>
            <Link to={"/"}>Home</Link>
          </div>
          <div className={location.pathname === "/crypto" && " active"}>
            <Link to={"/crypto"}>Crypto</Link>
          </div>
{/*           <div className={location.pathname === "/exchanges" && " active"}>
            <Link to={"/exchanges"}>Exchanges</Link>
          </div> */}
          <div className={location.pathname === "/news" && " active"}>
            <Link to={"/news"}>News</Link>
          </div>
        </div>
        {/* <div className="theme text-white">dark</div> */}
        <button
          className="text-white md:hidden"
          onClick={() => setActive(!active)}
        >
          <BiMenuAltRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
