import  { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from 'react-icons/rx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", link: "Home" },
    { path: "/favourite", link: "Wishlist" },
    
  ];

  return (
    <div className="bg-[#131c31] text-[#7eadfc] px-[10px] md:px-[30px] py-[14px] mb-[1px] ">
      <div className="flex flex-wrap justify-between items-center">
        <h2 className="text-[18px] md:text-[30px]">MovieHub</h2>
        <div className="w-[150px] md:w-[300px] ">
          <input className="w-[100%] py-[6px] px-[10px] rounded-2xl" placeholder="Search here..." />
        </div>
        <div className="md:hidden">
          {isMenuOpen ? (
            <RxCross1 className="text-3xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <GiHamburgerMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
        {/* Render the mobile menu */}
        <ul className={`bg-white z-50 md:hidden gap-12 text-lg block space-y-4 px-5 py-6 mt-24 ${
          isMenuOpen ? "fixed -top-8 left-0 w-full transition-all ease-out duration-150" : "hidden"
        }`}>
          {navItems.map(({ path, link }) => (
            <li key={link}>
              <NavLink onClick={toggleMenu} to={path}>
                {" "}
                {link}
              </NavLink>
            </li>
          ))}
        </ul>
        {/* Render the desktop menu */}
        <ul className="hidden md:flex text-[17px] cursor-pointer">
          <li><Link to="/">Home</Link></li>
          <li className="ml-[30px]"><Link to="/favourite">Wishlist</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
