import React from "react";

export default function Buy() {
  return (
    <div className="w-full p-5 bg-[#ff6b00] h-screen relative">
      <div className="bg-[url(/assets/book.webp)] bg-cover bg-center bg-no-repeat size-full brightness-50"></div>
      <div className="flex flex-col items-center justify-center absolute inset-0 top-0">
        <p className="text-white text-[42px]">orken wave</p>
        <h1 className="text-white text-[70px]">AVALIABLE NOW</h1>
        <div className="w-ull flex justify-center mt-5">
          <button className="w-auto bg-[#ff6b00] cursor-pointer text-white py-4 px-6 hover:bg-black hover:text-[#ff6b00]">
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
}
