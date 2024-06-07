import { useGSAP } from '@gsap/react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.css';
import { useCursorStore } from '../../hooks/useCursorStore';

gsap.registerPlugin(ScrollTrigger);

const letters = 'UNIVERSE'.split('');

const MOUSE_SENSITIVITY = 25;

export const Intro = () => {
  const { setActive } = useCursorStore();

  useGSAP(() => {
    gsap.fromTo('#title', {
      fontSize: '10vw',
    }, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: true,
        start: "top",
        end: "15%",
        // markers: true,
      },
      fontSize: '0vw',
    });

    gsap.to('.word', {
      clipPath: 'inset(0 0 0%)',
      stagger: 0.25,
    });
  });
  

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const smoothMouse = {
    x: useSpring(mouse.x, {stiffness: 200, damping: 50, mass: 3}),
    y: useSpring(mouse.y, {stiffness: 200, damping: 50, mass: 3})
  };

  return (
    <section
      onMouseEnter={() => {
        setActive(true);
      }}
      onMouseMove={(event) => {
        const { clientX, clientY } = event;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (clientX - centerX) / MOUSE_SENSITIVITY;
        const moveY = (clientY - centerY) / MOUSE_SENSITIVITY;
        
        mouse.x.set(-moveX);
        mouse.y.set(-moveY);
      }}
      className={styles.homeHeader}
    >
      <motion.div
        style={{
          x: smoothMouse.x,
          y: smoothMouse.y,
        }}
        className={styles.intro}
      >
        <p
          data-scroll
          data-scroll-speed="-0.7"
          id="title"
        >
          {letters.map((word, index) => {
            return (
              <span
                className="word"
                key={`word-${index}`}
              >
                {word}
              </span>
            );
          })}
        </p>
      </motion.div>
    </section>
  );
};
