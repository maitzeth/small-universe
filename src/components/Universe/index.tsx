import { useCursorStore } from '../../hooks/useCursorStore';
import { Scene } from './Scene';
import styles from './style.module.css';

export const Universe = () => {
  const { setActive } = useCursorStore();

  return (
    <section
      onMouseEnter={() => {
        setActive(false);
      }}
      className={styles.main}
      id="main"
    >
      <Scene />
    </section>
  );
};
