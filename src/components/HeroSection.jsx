

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const statsRef = useRef([]);
    const carRef = useRef(null);
    const pathRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // ===== INITIAL HIDDEN STATE =====
            gsap.set(
                [titleRef.current, pathRef.current, ...statsRef.current],
                {
                    opacity: 0,
                    y: 40,
                }
            );

            // Car starts LEFT
            gsap.set(carRef.current, {
                x: -300,
            });

            // ===== SCROLL TIMELINE =====
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=2000",
                    scrub: 1.5,
                    pin: true,
                },
            });

            // Background depth
            tl.to(
                bgRef.current,
                {
                    scale: 1.12,
                    y: -140,
                    ease: "none",
                },
                0
            );

            // 🚗 CAR MOVES FIRST
            tl.to(
                carRef.current,
                {
                    x: 320,
                    y: -130,
                    rotate: 4,
                    scale: 1.08,
                    ease: "none",
                },
                0.2
            );

            // ⭐ SHOW TITLE + PATH
            tl.to(
                [titleRef.current, pathRef.current],
                {
                    opacity: 1,
                    y: 0,
                    ease: "power3.out",
                },
                0.35
            );

            // ⭐ SHOW STATS
            tl.to(
                statsRef.current.filter(Boolean),
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    ease: "power3.out",
                },
                0.4
            );

            // ===== BUBBLE ANIMATION =====
            gsap.utils.toArray(".bubble").forEach((bubble, i) => {
                gsap.to(bubble, {
                    y: -800,
                    x: () => gsap.utils.random(-60, 60),
                    opacity: 0,
                    duration: gsap.utils.random(4, 8),
                    repeat: -1,
                    delay: i * 0.2,
                    ease: "none",
                });
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const text = "WELCOME ITZ FIZZ".split("");

    const stats = [
        { value: "95%", label: "User Satisfaction" },
        { value: "120K+", label: "Active Users" },
        { value: "4.9★", label: "Rating" },
    ];

    return (
        <section
            ref={heroRef}
            className="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-black"
        >
            {/* BACKGROUND */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black"
            />

            {/* Aesthetic glow */}
            <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[140px] rounded-full top-[-150px]" />
            <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full bottom-[-120px]" />

            {/* BUBBLES BACKGROUND */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <span
                        key={i}
                        className="bubble absolute rounded-full bg-white/20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            width: `${6 + Math.random() * 14}px`,
                            height: `${6 + Math.random() * 14}px`,
                            bottom: "-20px",
                        }}
                    />
                ))}
            </div>


            <div className="absolute bottom-[24vh] w-[65vw] flex justify-center">

                {/* Main glowing path */}
                <div
                    ref={pathRef}
                    className="
      relative
      w-full
      h-[3px]
      rounded-full
      bg-gradient-to-r
      from-purple-400/40
      via-white/70
      to-blue-400/40
      shadow-[0_0_20px_rgba(255,255,255,0.4)]
    "
                >

                    {/* Extra soft glow layer */}
                    <div className="absolute inset-0 blur-md opacity-60 bg-gradient-to-r from-purple-400/40 via-white/60 to-blue-400/40 rounded-full" />

                    {/* Moving shine effect */}
                    <div className="absolute top-0 left-0 h-full w-20 bg-white/50 blur-sm animate-[shine_2s_linear_infinite]" />
                </div>

            </div>

            {/* TITLE */}
            <h1
                ref={titleRef}
                className="
          z-10
          flex
          text-2xl md:text-6xl
          font-semibold
          tracking-[8px] md:tracking-[14px]
          bg-gradient-to-r from-white via-zinc-200 to-zinc-400
          bg-clip-text text-transparent
        "
            >
                {text.map((letter, i) => (
                    <span key={i}>{letter === " " ? "\u00A0" : letter}</span>
                ))}
            </h1>

            {/* STATS */}
            <div className="z-10 flex gap-4 mt-8">
                {stats.map((item, i) => (
                    <div
                        key={i}
                        ref={(el) => (statsRef.current[i] = el)}
                        className="
              px-5 py-3
              rounded-xl
              bg-white/5
              border border-white/10
              backdrop-blur-md
              text-center
              shadow-[0_8px_20px_rgba(0,0,0,0.3)]
              hover:scale-105
              transition duration-300
            "
                    >
                        <h2 className="text-lg md:text-xl font-semibold text-white">
                            {item.value}
                        </h2>
                        <p className="text-zinc-400 text-xs">{item.label}</p>
                    </div>
                ))}
            </div>

            {/* CAR */}
            <img
                ref={carRef}
                src="./hero-cars.png"
                alt="car"
                className="
          absolute
          bottom-[-4vh]
          w-[50vw]
          max-w-[600px]
          min-w-[260px]
          will-change-transform
          drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]
        "
            />
        </section>
    );
};

export default HeroSection;