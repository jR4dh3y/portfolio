'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize GSAP ScrollTrigger
    ScrollTrigger.defaults({
      toggleActions: 'play none none none',
      markers: false,
    });

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement;
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId && targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            gsap.to(window, {
              duration: 0.6,
              scrollTo: {
                y: targetElement,
                offsetY: 60,
              },
              ease: 'power2.inOut',
              delay: 0,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Parallax effect for gradient spots
    const gradientSpots = document.querySelectorAll('.gradient-spot');
    gradientSpots.forEach((spot, index) => {
      gsap.to(spot, {
        y: () => index % 2 === 0 ? -100 : 100,
        x: () => index % 2 === 0 ? -50 : 50,
        rotation: 360,
        ease: 'none',
        scrollTrigger: {
          trigger: spot,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <>{children}</>;
}
