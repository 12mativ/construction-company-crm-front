import Image from "next/image";
import logo from '/assets/1.png';
import UserAvatar from "./user-avatar";

const Header = () => {
  return (
    <div className='fixed flex items-center justify-between bg-white shadow-lg w-full h-[72px] px-12 z-50'>
      <div className="relative h-[48px] w-[48px]">
        <Image src={logo} alt="Logo" fill className='rounded-full' />
      </div>

      <div className='flex items-center gap-x-2'>
        <p>Кто Кто</p>
        <UserAvatar
          src='https://freesvg.org/img/FaceWoman.png'
        />
      </div>
    </div>
  );
};

export default Header;
