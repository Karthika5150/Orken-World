"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import logo from "../main/banner-logo.svg";
import { VideoData } from "../data/data";
import ScrollTrigger from "gsap/ScrollTrigger";
import Buy from "./buy";
import Horizontal from "./horizontal";

gsap.registerPlugin(ScrollTrigger);

export default function Main() {
  const overlay = useRef([]);

  const Movevalues = [2, 4, 6, 8];

  //umouse animation//

  useEffect(() => {
    const animations = overlay.current.map((box) => ({
      xTo: gsap.quickTo(box, "x", {
        duration: 0.4,
        ease: "power3.out",
      }),
      yTo: gsap.quickTo(box, "y", {
        duration: 0.4,
        ease: "power3.out",
      }),
    }));

    const handleMouseMove = (e) => {
      const x = e.clientX - window.innerWidth / 2;
      const y = e.clientY - window.innerHeight / 2;

      animations.forEach(({ xTo, yTo }, index) => {
        const amount = Movevalues[index];

        const movex = gsap.utils.clamp(-amount, amount, x * 0.03);
        const movey = gsap.utils.clamp(-amount, amount, y * 0.03);

        xTo(movex);
        yTo(movey);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  //   scroll trigger animation

  const mainRef = useRef(null);
  const contentRef = useRef(null);
  const imgRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    gsap
      .timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top 0%",
          end: "+=700",
          scrub: true,
        },
      })
      .to(mainRef.current, {
        filter: "brightness(96%)",
        duration: 0.01,
      })
      .to(imgRef.current, {
        x: -800,
        duration: 20,
        ease: "ease-in-out",
      })
      .to(
        contentRef.current,
        {
          y: -400,
          opacity: 0.6,
          duration: 2,
          ease: "ease-in-out",
        },
        0,
      )
      .to(
        videoContainerRef.current,
        {
          scale: 1,
          position: "sticky",
          y: -400,
          top: 0,
          rotate: 0,
          duration: 10,
          ease: "ease-in-out",
          backgroundAttachment: "fixed",
        },
        0,
      );
  }, []);

  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const videoRef = useRef(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);
  const numberRef = useRef(null);

  const cardRefs = useRef([]);

  const [active, setActive] = useState(0);

  const changeVideo = (index) => {
    if (!videoRef.current) return;

    videoRef.current.pause();
    videoRef.current.src = VideoData[index].videos;
    videoRef.current.load();

    videoRef.current.play().catch(() => {});
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, index) => {
        gsap.set(card, {
          x: index === 0 ? -50 : 650,
          zIndex: VideoData.length - index,
          scale: index === 0 ? 1 : 0.9,
          opacity: index === 0 ? 1 : 0.7,
        });
      });

      changeVideo(0);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=3000",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      VideoData.forEach((card, i) => {
        if (i === VideoData.length - 1) return;

        tl.to(
          cardRefs.current[i],
          {
            x: "-=1450",
            scale: 0.85,
            opacity: 0,
            duration: 1,
            ease: "none",
          },
          "+=0.2",
        );

        tl.to(
          cardRefs.current[i + 1],
          {
            x: "-=1450",
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "none",

            onStart: () => {
              setActive(i + 1);

              changeVideo(i + 1);

              gsap.fromTo(
                numberRef.current,
                {
                  y: 40,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.4,
                },
              );

              gsap.fromTo(
                titleRef.current,
                {
                  y: 30,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.4,
                },
              );

              gsap.fromTo(
                descRef.current,
                {
                  y: 30,
                  opacity: 0,
                },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.4,
                },
              );
            },
          },
          "<",
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const section = videoContainerRef.current;
  //     const wrapper = wrapperRef.current;
  //     const horizontal = horizontalRef.current;

  //     gsap.set(wrapper, {
  //       scale: 0.8,
  //       rotation: 3,
  //       transformOrigin: "center center",
  //     });

  //     const intro = gsap.timeline({
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top top",
  //         end: "top top",
  //         scrub: 1,
  //       },
  //     });

  //     intro.to(wrapper, {
  //       scale: 1,
  //       rotation: 0,
  //       position: "sticky",
  //       top: 0,
  //       ease: "none",
  //     });

  //     gsap.to(horizontal, {
  //       x: () => -(horizontal.scrollWidth - window.innerWidth),
  //       ease: "none",
  //       scrollTrigger: {
  //         trigger: section,
  //         start: "top top",
  //         end: () => `${horizontal.scrollWidth}`,
  //         pin: true,
  //         scrub: 1,
  //         invalidateOnRefresh: true,
  //       },
  //     });
  //   }, videoContainerRef);

  //   return () => ctx.revert();
  // }, []);

  //   useEffect(() => {
  //     const ctx = gsap.context(() => {
  //       const polygons = gsap.utils.toArray(".triangle polygon");

  //       gsap.set(polygons, {
  //         fill: "transparent",
  //       });

  //       gsap.to(polygons, {
  //         fill: "#ff6b00",
  //         stroke: "#ff6b00",
  //         opacity: 1,
  //         stagger: {
  //           each: 0.08,
  //           from: "start",
  //         },
  //         ease: "none",

  //         scrollTrigger: {
  //           trigger: triangleRef.current,
  //           start: "top center",
  //           end: "bottom center",
  //           scrub: true,
  //         },
  //       });
  //     }, triangleRef);

  //     return () => ctx.revert();
  //   }, []);

  return (
    <main className="w-full h-auto bg-[#ff6b00] font-gothic">
      <div className="h-screen  w-full relative" ref={mainRef}>
        {/* banner img */}

        <div className="w-1/2 h-full relative" ref={imgRef}>
          <div className="size-full">
            <img
              src="/assets/img1.webp"
              alt="img"
              className="size-full object-cover scale-x-110"
            />
          </div>
          {[
            "/assets/img2.webp",
            "/assets/img3.webp",
            "/assets/img4.webp",
            "/assets/img5.webp",
          ].map((val, index) => (
            <div
              key={index}
              className={`absolute ${
                index === 0
                  ? "top-22 right-14 scale-117"
                  : index === 1
                    ? "top-18 right-10 scale-y-115 scale-x-110"
                    : index === 2
                      ? "right-0 top-[78px] scale-115"
                      : "bottom-0 right-0 scale-105"
              }  img`}
              ref={(el) => (overlay.current[index] = el)}
            >
              <img src={val} alt="img" className="size-full object-cover" />
            </div>
          ))}
        </div>

        {/* banner-content */}

        <div
          className="absolute z-16 w-full flex flex-col inset-0 bottom-10 justify-end gap-35 items-center"
          ref={contentRef}
        >
          <div>
            <img src={logo.src} alt="img" />
          </div>
          <div className="flex flex-col items-center gap-5">
            <p className="uppercase text-[28px] text-white">
              Together we fight. Some of us will die.
            </p>
            <button className="w-25 group hover:w-30 h-10 bg-black text-white hover:text-[#ff6b00] text-[20px] transition-all duration-200 linear hover:tracking-tight tracking-[-2px] cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* <div
        className="w-full h-screen flex relative overflow-hidden"
        ref={videoContainerRef}
      >
        <div className="flex h-full size-full overflow-hidden" ref={wrapperRef}>
          <div className="h-full flex gap-0">
            {VideoData.map((val) => (
              <div key={val.id} className="w-screen h-screen gap-0 relative">
                <video width="100%" height="auto" autoPlay muted loop>
                  <source src={val.videos} type="video/mp4" />
                </video>

                <div
                  className="w-screen h-screen absolute top-0 flex-shrink-0 gap-0 inset-0 z-50! flex justify-end items-center pr-20"
                  ref={horizontalRef}
                >
                  <div className="w-[25%] bg-[#ff6b00] group transition-all  duration-500 ease-in-out cursor-pointer">
                    <div className="group-hover:p-5">
                      <video width="100%" height="auto" autoPlay muted loop>
                        <source src={val.videos} type="video/mp4" />
                      </video>
                    </div>
                    <div className="group-hover:bg-[#ff6b00] bg-black p-5">
                      <p className="text-[48px] text-white w-1/2">
                        {val.content}
                      </p>
                      <div className="flex gap-2 items-center mt-4 group-hover:mt-6">
                        <p className="text-[14px] text-white">Trailer</p>
                        <p className="text-white">|</p>
                        <p className="text-[14px] text-white">1:15</p>
                        <p className="text-white">|</p>
                        <p className="text-[14px] text-white">Youtube</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="absolute top-0 w-full inset-0 left-0 flex flex-wrap mt-[-18vh] ml-[-10vh] pointer-events-none"
            ref={triangleRef}
          >
            <div className="triangle-line">
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div className="triangle-line">
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div className="triangle-line">
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
            </div>
            <div className="triangle-line">
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
              <div className="triangle-duo">
                <svg className="triangle triangle-up" viewBox="0 0 100 100.1">
                  <polygon
                    points="50 15, 100 100, 0 100"
                    stroke="white"
                  ></polygon>
                </svg>
                <svg className="triangle triangle-down" viewBox="0 0 100 100">
                  <polygon
                    points="100 15, 50 100, 0 15"
                    stroke="white"
                  ></polygon>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <section ref={sectionRef} className="relative h-[600vh]">
        <div ref={bgRef} className="sticky top-0 h-screen overflow-hidden">
          {/* Background Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/45" />

          {/* Left Big Number */}
          <div className="pointer-events-none absolute left-24 top-1/2 -translate-y-1/2">
            <h1
              ref={numberRef}
              className="text-[230px] font-black leading-none text-white/10"
            >
              {VideoData[active].id + 1}
            </h1>
          </div>

          {/* Left Content */}
          <div className="absolute left-24 top-24 max-w-xl text-white">
            <p className="uppercase tracking-[6px] text-white/70">
              ORKEN STYLE
            </p>

            <h2 ref={titleRef} className="mt-6 text-6xl font-bold">
              {VideoData[active].title}
            </h2>

            <p ref={descRef} className="mt-6 text-xl leading-9 text-white/80">
              {VideoData[active].description}
            </p>
          </div>

          {/* VideoData */}
          <div className="absolute inset-0">
            {VideoData.map((card, index) => (
              <div
                key={card.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="absolute right-10 top-1/2 h-[560px] w-[400px] -translate-y-1/2 rounded-[32px] shadow-2xl"
                style={{
                  background: card.color,
                }}
              >
                <div className="group-hover:p-5">
                  <video width="100%" height="auto" autoPlay muted loop>
                    <source src={card.videos} type="video/mp4" />
                  </video>
                </div>
                <div className="group-hover:bg-[#ff6b00] bg-black p-5">
                  <p className="text-[48px] text-white w-1/2">{card.content}</p>
                  <div className="flex gap-2 items-center mt-4 group-hover:mt-6">
                    <p className="text-[14px] text-white">Trailer</p>
                    <p className="text-white">|</p>
                    <p className="text-[14px] text-white">1:15</p>
                    <p className="text-white">|</p>
                    <p className="text-[14px] text-white">Youtube</p>
                  </div>
                </div>

                {/* <div className="flex h-full flex-col justify-between p-10">
                  <div>
                    <h1 className="text-7xl font-black text-white">
                      {card.id}
                    </h1>

                    <h2 className="mt-10 text-4xl font-bold text-white">
                      {card.title}
                    </h2>

                    <p className="mt-6 text-lg leading-8 text-white/80">
                      {card.description}
                    </p>
                  </div>

                  <button className="w-fit rounded-full bg-white px-8 py-4 font-semibold text-black">
                    Explore
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Buy />
      <Horizontal />
    </main>
  );
}
