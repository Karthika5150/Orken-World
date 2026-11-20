"use client";
import React, { useEffect, useRef } from "react";
import logo from "./logo.svg";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap";       

gsap.registerPlugin(ScrollTrigger);

export default function Nav() {
  const navRef = useRef(null);
  const logoRef = useRef(null);

  // useEffect(() => {
  //   gsap
  //     .timeline({
  //       scrollTrigger: {
  //         trigger: document.body,
  //         start: "top 0%",
  //         end: "+=200",
  //         scrub: true,
  //       },
  //     })
  //     .to(navRef.current, {
  //       height: "170px",
  //       duration: 1,
  //       paddingTop: "0px",
  //     })
  //     .to(
  //       logoRef.current,
  //       {
  //         scale: 0.6,
  //         duration: 0.5,
  //         rotate:360,
  //         ease: "ease-in-out",
  //       },
  //       0
  //     );
  // }, []);

  return (
    <div
      className="w-full pt-10 fixed top-0 z-15 h-screen flex justify-center bg-transparent"
      ref={navRef}
    >
      <div
        className="size-25 cursor-pointer hover:scale-110 transition-all duration-100 linear "
        ref={logoRef}
      >
        <img src={logo.src} alt="logo" className="size-full object-cover " />
      </div>
    </div>
  );
}
