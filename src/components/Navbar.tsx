// Navbar.tsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-[#131c31] text-[#7eadfc] px-[10px] md:px-[30px] py-[14px] mb-[1px] ">
      <div className="flex flex-wrap justify-around items-center ">
        <h2 className="text-[18px] md:text-[30px]">MovieHub</h2>
        <div className="w-[150px] md:w-[300px] ">
          <input className="w-[100%] py-[6px] px-[10px] rounded-2xl" placeholder="Search here..." />
        </div>
        <div className="flex justify-between">
          <ul className="hidden md:flex text-[17px] cursor-pointer">
            <li><Link to="/">Home</Link></li>
            <li className="ml-[30px]"><Link to="/favourite">Wishlist</Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
