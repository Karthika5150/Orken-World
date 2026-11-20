"use client";
import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

const SmoothScrollWrapper = () => {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);


    useEffect(() => {

        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

        const lenis = new Lenis({
            duration: isMobile ? 1 : 1.2,
            easing: (t) => t * (2 - t),
            smooth: true,
            smoothTouch: false,
            syncTouch: isMobile,
            smoothWheel: true,
            wheelMultiplier: 0.7, //0.9
            lerp: isMobile ? 0.12 : 0.08,  //0.08
            touchMultiplier: 1.1, //1.1
            syncTouchLerp: 0.08,

        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(raf);
        }

        rafRef.current = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();

            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
        }

    }, []);



    return <div></div>;
};

export default SmoothScrollWrapper;