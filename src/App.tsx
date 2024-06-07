import { useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import LocomotiveScroll from 'locomotive-scroll';
import styles from './style.module.css';
import { useWindowSize } from 'react-use';

import { Universe } from './components/Universe';
import { Intro } from './components/Intro';
import { Description } from './components/Description';
import { Cursor } from './components/Cursor';

function App() {
  const { width } = useWindowSize();

  const initSmoothScroll = async () => {
    new LocomotiveScroll();
  }
  
  useEffect(() => {
    initSmoothScroll();
  }, []);

  if (width <= 1024) {
    return (
      <div className={styles.app}>
        <h1>THIS SITE IS NOT COMPATIBLE ON MOBILE</h1>
      </div>
    );
  }

  return (
    <main className={styles.main}>
      <Intro />
      <Universe />
      <Description />
      <Cursor />
    </main>
  )
}

export default App;
