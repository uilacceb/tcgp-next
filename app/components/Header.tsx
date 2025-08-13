import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-700">
      <Link href="/">
      <Image src="/logo.png" alt="logo" width={100} height={100} className="cursor-pointer"/>
      </Link>
      <input
        className="border-2 border-gray-400 h-[70%] px-2  py-2 text-white  rounded-full"
        placeholder="Search pokemon"
      ></input>
    </div>
  );
};

export default Header;
