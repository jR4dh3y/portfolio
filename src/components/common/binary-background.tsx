'use client';

import React, { useEffect, useRef } from 'react';

export default function BinaryBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const generateBinaryBackground = () => {
      const { clientWidth, clientHeight } = container;
      
      // Based on the original HTML logic:
      // cols = window.innerWidth / 15
      // rows = window.innerHeight / 24
      const cols = Math.floor(clientWidth / 15);
      const rows = Math.floor(clientHeight / 24);

      let html = '';
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const value = Math.random() > 0.5 ? '1' : '0';
          html += `<span class="binary-digit" data-value="${value}">${value}</span>`;
        }
        html += '\n';
      }

      container.innerHTML = html;

      const digits = container.querySelectorAll('.binary-digit');
      digits.forEach((digit) => {
        digit.addEventListener('mouseenter', function (this: HTMLElement) {
          if (!this.classList.contains('flipping')) {
            this.classList.add('flipping');
            this.classList.add('highlighted');

            const currentValue = this.getAttribute('data-value');
            const newValue = currentValue === '0' ? '1' : '0';
            this.setAttribute('data-value', newValue);
            this.textContent = newValue;

            setTimeout(() => {
              this.classList.remove('flipping');
            }, 200);

            setTimeout(() => {
              this.classList.remove('highlighted');
            }, 500);
          }
        });
      });
    };

    generateBinaryBackground();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(generateBinaryBackground, 250);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .binary-digit {
          color: #c59edc;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          user-select: none;
          display: inline-block;
          position: relative;
          transition: color 0.3s ease-out, text-shadow 1.5s ease-out, transform 0.5s ease-out;
        }

        .binary-digit:hover {
          color: #c3fb5b;
          text-shadow: 0 0 15px #c3fb5b, 0 0 25px #c3fb5b;
          transform: scale(1.5);
          z-index: 10;
        }

        .binary-digit.highlighted {
          color: #c3fb5b;
          text-shadow: 0 0 15px #c3fb5b, 0 0 25px #c3fb5b;
        }

        .binary-digit.flipping {
          animation: flip 0.15s ease;
        }

        @keyframes flip {
          0% {
            transform: rotateX(0deg);
          }
          50% {
            transform: rotateX(90deg);
          }
          100% {
            transform: rotateX(0deg);
          }
        }
      `}</style>
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-hidden whitespace-pre p-[10px] font-mono leading-[1.5] tracking-[8px]"
        style={{ fontFamily: "'Courier New', monospace" }}
      />
    </>
  );
}
