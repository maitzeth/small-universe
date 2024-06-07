import { useMotionValue } from "framer-motion";
import { useEffect } from "react";

export function useMouse() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    mouse.x.set(clientX);
    mouse.y.set(clientY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return mouse;
}
