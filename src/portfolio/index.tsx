import './global.scss';
import { createSignal, onMount, } from "solid-js";
import { debouce, availableSections } from './utils';
import Canvas from './canvas/Canvas'
import JumpableSection from './sections/JumpableSection';
import MainSection  from './sections/MainSection';
import BlogSection from './sections/BlogSection';
import ProjectSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import Menu from './components/Menu'
import SectionCounter from './components/SectionCounter';
import Socials from './components/socials';

export default function IndexPage() {
    const [section, setSection] = createSignal(1);
    const [progress, setProgress] = createSignal(0);
    let canvasElement!: HTMLCanvasElement;
    let canvas;
    let mainElement!: HTMLElement;
    let sectionsRefs = new Map<number, HTMLElement>();

    const addRef = (sectionName: number , ref: HTMLElement) => sectionsRefs.set(sectionName, ref);

    onMount(() => {        
        window.addEventListener("wheel", debouce((event: WheelEvent) => {
            event.preventDefault();

            const sectionsLength = sectionsRefs.size;
            const previousSection = section();

            if (event.deltaY < 100) {
                setSection(Math.max(1, section() - 1));
            } else {
                setSection(Math.min(section() + 1, sectionsLength));
            }
            
            const currentSection = section();
            if (previousSection !== currentSection) {                
                sectionsRefs.get(currentSection - 1)!.scrollIntoView({
                    behavior: "smooth"
                });
            }
        }), false);

        canvas = new Canvas(canvasElement);
        canvas.addOnProgressCallback(setProgress);
        canvas.start();
        canvas.render();
    })

    return (
        <>
            <canvas ref={canvasElement} id="CanvasDisplay" class="fixed"/>
            <Menu setSection={setSection} />
            <main ref={mainElement} class="relative max-h-screen overflow-y-hidden no-scrollbar pointer-events-none">
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.index}>
                    <MainSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.projects}>
                    <ProjectSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.blog}>
                    <BlogSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.about}>
                    <AboutSection/>
                </JumpableSection>
            </main>
            <SectionCounter section={section} />
            <Socials/>
        </>
    )
}