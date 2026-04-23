"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CurtainReveal() {
  const topRef = useRef<HTMLDivElement>(null);
  const botRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!topRef.current || !botRef.current) return;

    // Kill any previously running tweens on these elements (StrictMode double-invoke)
    gsap.killTweensOf([topRef.current, botRef.current]);

    let opened = false;
    const open = () => {
      if (opened) return;
      opened = true;
      window.dispatchEvent(new CustomEvent("curtain:open"));
      setDone(true);
    };

    const tl = gsap.timeline({ onComplete: open });

    tl.fromTo(topRef.current, { yPercent: -100 }, { yPercent: 0, duration: 0.55, ease: "power4.inOut" }, 0);
    tl.fromTo(botRef.current, { yPercent: 100 }, { yPercent: 0, duration: 0.55, ease: "power4.inOut" }, 0);
    tl.to(topRef.current, { yPercent: -100, duration: 0.65, ease: "power4.inOut" }, "+=0.06");
    tl.to(botRef.current, { yPercent: 100, duration: 0.65, ease: "power4.inOut" }, "<");

    // Safety fallback — if GSAP stalls for any reason, force-open after 3s
    const fallback = setTimeout(open, 2000);

    return () => {
      tl.kill();
      clearTimeout(fallback);
    };
  }, []);

  if (done) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none" aria-hidden>
      <div
        ref={topRef}
        className="absolute top-0 left-0 w-full h-1/2"
        style={{ background: "linear-gradient(135deg, #2e1065 0%, #7c3aed 50%, #ec4899 100%)" }}
      />
      <div
        ref={botRef}
        className="absolute bottom-0 left-0 w-full h-1/2"
        style={{ background: "linear-gradient(135deg, #2e1065 0%, #7c3aed 50%, #ec4899 100%)" }}
      />
    </div>
  );
}
