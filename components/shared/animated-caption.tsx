"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type CaptionStyleType = "hormozi" | "ali-abdaal" | "minimalist" | "neon" | "typewriter" | "karaoke";

interface AnimatedCaptionProps {
  text: string;
  styleName: CaptionStyleType;
  className?: string;
}

export function AnimatedCaption({ text, styleName, className }: AnimatedCaptionProps) {
  // A simple way to force re-render animations on an interval for preview looping
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const words = text.split(" ");
  const chars = text.split("");

  // Common wrapper
  const Wrapper = ({ children, customClass }: { children: React.ReactNode, customClass?: string }) => (
    <div key={key} className={cn("w-full text-center p-2", customClass, className)}>
      {children}
    </div>
  );

  switch (styleName) {
    case "hormozi":
      return (
        <Wrapper customClass="font-black text-4xl uppercase tracking-tighter leading-tight mt-10">
          {words.map((word, i) => (
            <span
              key={i}
              className="inline-block mx-1 animate-[bounce-in_0.5s_ease-out_forwards] opacity-0"
              style={{
                color: i % 2 === 0 ? "white" : "#FFD700",
                textShadow: "4px 4px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000",
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {word}
            </span>
          ))}
          <style>{`
            @keyframes bounce-in {
              0% { opacity: 0; transform: scale(0.5) translateY(20px); filter: blur(4px); }
              60% { opacity: 1; transform: scale(1.1) translateY(-5px); filter: blur(0px); }
              100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0px); }
            }
          `}</style>
        </Wrapper>
      );
      
    case "ali-abdaal":
      return (
        <Wrapper customClass="font-bold text-2xl mt-10">
          <div className="inline-block bg-white text-black px-4 py-2 rounded-2xl shadow-xl border-4 border-gray-100 animate-[slide-up_0.5s_ease-out_forwards] opacity-0 text-center">
            {text}
          </div>
          <style>{`
            @keyframes slide-up {
              0% { opacity: 0; transform: translateY(30px) scale(0.9); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
        </Wrapper>
      );

    case "minimalist":
      return (
        <Wrapper customClass="font-light text-2xl tracking-widest text-white/90 uppercase mt-10">
          <span className="animate-[fade-in-slow_2s_ease-out_forwards] opacity-0 drop-shadow-lg inline-block">
            {text}
          </span>
          <style>{`
            @keyframes fade-in-slow {
              0% { opacity: 0; filter: blur(8px); transform: translateY(10px); }
              100% { opacity: 1; filter: blur(0px); transform: translateY(0); }
            }
          `}</style>
        </Wrapper>
      );

    case "neon":
      return (
        <Wrapper customClass="font-bold text-4xl italic text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mt-10">
          <span className="animate-[pulse-neon_1.5s_ease-in-out_infinite] drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] inline-block">
            {text}
          </span>
          <style>{`
            @keyframes pulse-neon {
              0%, 100% { filter: brightness(1) hue-rotate(0deg); text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899; }
              50% { filter: brightness(1.2) hue-rotate(30deg); text-shadow: 0 0 15px #06b6d4, 0 0 30px #06b6d4; }
            }
          `}</style>
        </Wrapper>
      );

    case "typewriter":
      return (
        <Wrapper customClass="font-mono text-xl text-green-400 bg-black/70 p-3 rounded-md border border-green-500/30 text-left inline-block mt-10 shadow-[0_0_15px_rgba(74,222,128,0.2)]">
          {chars.map((char, i) => (
            <span
              key={i}
              className="opacity-0 animate-[reveal_0.1s_steps(1)_forwards]"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char}
            </span>
          ))}
          <span className="animate-[blink_1s_step-end_infinite] ml-1 border-r-4 border-green-400 inline-block h-5 align-middle"></span>
          <style>{`
            @keyframes reveal {
              to { opacity: 1; }
            }
            @keyframes blink {
              50% { border-color: transparent; }
            }
          `}</style>
        </Wrapper>
      );
      
    case "karaoke":
      return (
        <Wrapper customClass="font-bold text-4xl text-white drop-shadow-xl mt-10 flex flex-wrap justify-center gap-x-2">
          {words.map((word, i) => (
            <span
              key={i}
              className="relative inline-block"
            >
              {/* Background text */}
              <span className="text-white/40">{word}</span>
              {/* Foreground colored text that sweeps in */}
              <span 
                className="absolute left-0 top-0 text-cyan-400 overflow-hidden whitespace-nowrap animate-[karaoke-sweep_0.4s_ease-out_forwards]"
                style={{ 
                  width: '0%',
                  animationDelay: `${i * 0.4}s` 
                }}
              >
                {word}
              </span>
            </span>
          ))}
          <style>{`
            @keyframes karaoke-sweep {
              0% { width: 0%; transform: scale(1); }
              50% { transform: scale(1.1); text-shadow: 0 0 10px #22d3ee; }
              100% { width: 100%; transform: scale(1); text-shadow: 0 0 0px transparent; }
            }
          `}</style>
        </Wrapper>
      );

    default:
      return <div>{text}</div>;
  }
}
