import gsap from "gsap";
import { useEffect, useRef } from "react";
import styles from './style.module.css';
import { useCursorStore } from "../../hooks/useCursorStore";
import { motion, useMotionValue } from 'framer-motion';
import { linearAnimation } from '../../utils';

export function Cursor() {
  const { isActive } = useCursorStore();

  const rafId = useRef<number | null>(null);
  const circle = useRef(null);
  const size = 200;

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const delayedMouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  }

  const manageMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  }

  const animate = () => {
    delayedMouse.x.set(linearAnimation(delayedMouse.x.get(), mouse.x.get(), 0.075));
    delayedMouse.y.set(linearAnimation(delayedMouse.y.get(), mouse.y.get(), 0.075));

    moveCircle(delayedMouse.x.get(), delayedMouse.y.get());
    
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
