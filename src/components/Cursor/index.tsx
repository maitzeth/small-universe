import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from './style.module.css';
import { useCursorStore } from "../../hooks/useCursorStore";
import { motion } from 'framer-motion';
import { linearAnimation } from '../../utils';

export function Cursor() {
  const { isActive } = useCursorStore();
  const mouse = useRef({ x: 0, y: 0 });
  const delayedMouse = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const circle = useRef(null);
  const size = 200;

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    
    // REFACTOR A FRAMER_MOTION
    // TODO
    mouse.current = {
      x: clientX,
      y: clientY
    };
  }

  const animate = () => {
    const { x, y } = delayedMouse.current;

    delayedMouse.current = {
      x: linearAnimation(x, mouse.current.x, 0.075),
      y: linearAnimation(y, mouse.current.y, 0.075)
    }

    moveCircle(delayedMouse.current.x, delayedMouse.current.y);
    
    rafId.current = window.requestAnimationFrame(animate);
  }

  const moveCircle = (x: number, y: number) => {
    gsap.set(circle.current, {x, y, xPercent: -50, yPercent: -50})
  }

  useEffect( () => {
    animate();
    window.addEventListener("mousemove", manageMouseMove);
    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      if (rafId.current) {
        window.cancelAnimationFrame(rafId.current)
      }
    }
  }, []);

  return (
    <div className={styles.main}>
      <motion.div 
        style={{
          backgroundColor: "red",
          width: size,
          height: size,
          filter: `blur(50px)`,
          opacity: !isActive ? 0 : 1,
          transition: `opacity 0.5s ease-out`
        }}
        className={styles.cursor} 
        ref={circle}
      />
    </div>
  );
}
