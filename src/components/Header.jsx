import React from "react";
import { FaGithub } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center max-w-[1400px] border-4 border-[#2E073F] rounded-2xl my-8 px-4 m-auto py-8">
        <div className="flex justify-between items-center w-[23%]">
          <p className="text-2xl font-bold text-zinc-800">RezaShirali - ReactJS</p>
          <a href="https://github.com/Reza-Shirali" target="_blank" className="text-zinc-800 text-3xl">
            <FaGithub />
          </a>
        </div>
        <div>
            <p className="text-2xl font-bold text-zinc-800">Nested Category</p>
        </div>
      </header>
    </>
  );
};

export default Header;
