import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import { TiArrowSortedDown } from "react-icons/ti";
import { CiSearch } from "react-icons/ci";
import { setSearchInput } from "../features/movies/moviesSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const searchInput = useSelector((state:any) => state.movies.searchInput);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", link: "Home", showDownArrow: false },
    { path: "/category", link: "Category", showDownArrow: true },
    { path: "/favourite", link: "Wishlist", showDownArrow: false },
  ];

  const handleUserSearchInput = (event:any) => {
    dispatch(setSearchInput(event.target.value));
  };

  return (
    <div className="bg-[#131c31] text-[#7eadfc] px-[10px] md:px-[30px] py-[14px] mb-[1px] ">
      <div className="flex flex-wrap justify-around items-center">
        <Link to="/">
          <h2 className="text-[18px] md:text-[30px]">MovieHub</h2>
        </Link>
        <Link to="/movies">
        <div className="w-[150px] md:w-[300px] inline-flex items-center">
          <input
            className="w-[100%] py-[6px] px-[10px] rounded-2xl text-sm md:text-base"
            placeholder="Search Movie here..."
            onChange={(event)=> handleUserSearchInput(event)}
            value={searchInput}
          />
          <CiSearch />
        </div></Link>
        <div className="lg:hidden">
          {isMenuOpen ? (
            <RxCross1 className="text-3xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <GiHamburgerMenu className="text-3xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>
        <ul
          className={`bg-white z-50 lg:hidden gap-12 text-lg block space-y-4 px-5 py-6 mt-24 ${
            isMenuOpen ? "fixed -top-8 left-0 w-full transition-all ease-out duration-150" : "hidden"
          }`}
        >
          {navItems.map(({ path, link, showDownArrow }) => (
            <li key={link} className="">
              <NavLink onClick={toggleMenu} to={path} >
                {link}
                {showDownArrow && <TiArrowSortedDown />}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="hidden lg:flex text-[17px] cursor-pointer">
          {navItems.map((item, index) => (
            <Link to={item.path} key={index}>
              <li className="mr-6 inline-flex items-center">
                {item.link}
                {item.showDownArrow && <TiArrowSortedDown />}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
