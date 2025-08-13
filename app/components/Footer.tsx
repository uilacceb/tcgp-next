import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 flex justify-center items-center bg-slate-700">
      <p className="lg:w-[50%] md:w-[70%] text-white p-2">
        <Image
          src="/psyduck.png"
          alt="psyduck logo"
          width={30}
          height={30}
          className="inline"
        />
        The literal and graphical information presented on this website about
        the Pokémon Trading Card Game Pocket, including card images and text, is
        copyright The Pokémon Company, DeNA Co., Ltd., and/or Creatures, Inc..
        This website is not produced by, endorsed by, supported by, or
        affiliated with any of those copyright holders.
      </p>
    </footer>
  );
};

export default Footer;
