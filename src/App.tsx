import { createSignal, onMount, } from "solid-js";
import { getScrollPercent, sectionNameToNumber, smoothStep, checkIfMobile } from './utils.ts';
import Canvas from './canvas/Canvas'
import LoadingPage from './sections/LoadingPage';
import JumpableSection from './sections/JumpableSection';
import MainSection from './sections/MainSection';
import BlogSection from './sections/Blog/BlogSection';
import ProjectSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import Menu from './components/Menu'
import SectionCounter from './components/SectionCounter';
import Socials from './components/socials';
import ScrollPointer from "./components/ScrollPointer"

function App() {
  const [section, setSection] = createSignal(1);
  const [progress, setProgress] = createSignal(0);
  const [blur, setBlur] = createSignal('0px')
  const [isMobile, setIsMobile] = createSignal(false);

  let canvasElement!: HTMLCanvasElement;
  let canvas;

  let options = {
    rootMargin: "-25px",
    threshold: 0.5,
  };


  const onSectionEntered = (entries: Array<IntersectionObserverEntry>) => {
    let sectionId = 1;
    const visibleEntries = entries.filter((entry) => entry.isIntersecting);

    const lastEntry = visibleEntries.pop();
    if (!lastEntry) {
      return;
    }

    sectionId = sectionNameToNumber[lastEntry.target.id];

    if (Math.abs(sectionId - section())) {
      setSection(sectionId);
    }
  }

  const observer = new IntersectionObserver(onSectionEntered, options);

  const addRef = (ref: HTMLElement) => {
    observer.observe(ref);
  }

  const handleBlurOnScroll = () => {
    const scrollPercent = getScrollPercent();
    let blur = 0;
    if (scrollPercent > 10) {
      blur = smoothStep(scrollPercent, 0, 10) * 15;
    }

    setBlur(`${blur}px`)
  }

  onMount(() => {
    setIsMobile(checkIfMobile());

    window.addEventListener("scroll", handleBlurOnScroll);

    canvas = new Canvas(canvasElement);
    canvas.addOnProgressCallback(setProgress);
    canvas.start();
    canvas.render(0);
  })

  return (
    <>
      <canvas ref={canvasElement} id="CanvasDisplay" class="fixed" />
      <LoadingPage progress={progress} />
      <Menu setSection={setSection} />
      <main class="relative no-scrollbar pointer-events-none" style={{ 'backdrop-filter': `blur(${blur()})`, '-webkit-backdrop-filter': `blur(${blur()})`, 'background-color': `#0003` }}>
        <JumpableSection registerSelf={addRef} sectionName={"home"} pointerEventsOnSmallScreen={isMobile()}>
          <MainSection />
        </JumpableSection>
        <JumpableSection registerSelf={addRef} sectionName={"projects"} pointerEventsOnSmallScreen={true}>
          <ProjectSection />
        </JumpableSection>
        <JumpableSection registerSelf={addRef} sectionName={"blog"} pointerEventsOnSmallScreen={true}>
          <BlogSection />
        </JumpableSection>
        <JumpableSection registerSelf={addRef} sectionName={"about"} pointerEventsOnSmallScreen={true}>
          <AboutSection />
        </JumpableSection>
      </main>
      <SectionCounter currentSection={section} />
      <ScrollPointer currentSection={section} maxSection={4} />
      <Socials shouldHideOnMobile={true} isInMenu={false} />
    </>
  )
}

export default App
