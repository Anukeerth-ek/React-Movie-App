import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";


const Navbar = () => {
     const [isMenuOpen, setIsMenuOpen] = useState(false);

     const toggleMenu = () => {
          setIsMenuOpen(!isMenuOpen);
     };

     const navItems = [
          { path: "/", link: "Home", showDownArrow: false },
          { path: "/category", link: "Category" , showDownArrow: true },
          { path: "/favourite", link: "Wishlist"  , showDownArrow: false},
     ];

     return (
          <div className="bg-[#131c31] text-[#7eadfc] px-[10px] md:px-[30px] py-[14px] mb-[1px] ">
               <div className="flex flex-wrap justify-around items-center">
                    <Link to="/">
                         <h2 className="text-[18px] md:text-[30px]">MovieHub</h2>
                    </Link>
                    <div className="w-[150px] md:w-[300px] inline-flex items-center">
                         <input className="w-[100%] py-[6px] px-[10px] rounded-2xl" placeholder="Search Movie here..." />
                         <CiSearch />
                    </div>
                    <div className="md:hidden">
                         {isMenuOpen ? (
                              <RxCross1 className="text-3xl cursor-pointer" onClick={toggleMenu} />
                         ) : (
                              <GiHamburgerMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
                         )}
                    </div>
                    {/* Render the mobile menu */}
                    <ul
                         className={`bg-white z-50 md:hidden gap-12 text-lg block space-y-4 px-5 py-6 mt-24 ${
                              isMenuOpen ? "fixed -top-8 left-0 w-full transition-all ease-out duration-150" : "hidden"
                         }`}
                    >
                         {navItems.map(({ path, link, showDownArrow }) => (
                              <li key={link} className="">
                                   <NavLink onClick={toggleMenu} to={path}>
                                        
                                        {link}
                                        {showDownArrow && <TiArrowSortedDown/>}
                                   </NavLink>
                              </li>
                         ))}
                    </ul>
                    {/* Render the desktop menu */}
                    <ul className="hidden md:flex text-[17px] cursor-pointer">
                         {navItems.map((item,index)=> (
                             <Link to={item.path} key={index}>
                              <li className="mr-6 inline-flex items-center">
                                   {item.link}
                                   {item.showDownArrow && <TiArrowSortedDown/>}
                              </li></Link>
                         ))}
                    </ul>
               </div>
          </div>
     );
};

export default Navbar;
