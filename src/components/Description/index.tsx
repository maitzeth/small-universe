import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PropsWithChildren, useRef, useState } from 'react';
import styles from './style.module.css';
import { Scene } from './Scene';

gsap.registerPlugin(ScrollTrigger);

const phrases = [
  "The universe is everything.",
  "It includes all of space.",
  "Even includes time itself.",
  "Believe or not, includes you.",
  "It is, simply, everything."
];

export const Description = () => {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <div className={styles.main}>
      <ul
        className={styles.description}
        onMouseLeave={() => {
          setActiveProject(null);
        }}
      >
        {phrases.map( (phrase, index) => {
          return (
            <li
              key={index}
              onMouseOver={() => setActiveProject(index)}
            >
              <AnimatedText>{phrase}</AnimatedText>
            </li>
          );
        })}
      </ul>
      <Scene activeProject={activeProject} />
    </div>
  );
};

function AnimatedText({ children }: PropsWithChildren) {
  const text = useRef<HTMLParagraphElement | null>(null);

  useGSAP(() => {
    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        scrub: true,
        start: "top bottom",
        end: "bottom+=400px bottom",
        // markers: true
      },
      clipPath: 'inset(0 100% 0 0)',
      right: "-100px",
      ease: "power3.Out"
    });
  });
  
  return (
    <>
      <p ref={text}>
        {children}
      </p>
    </>
  );
}

