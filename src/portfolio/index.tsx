import './global.scss';
import { createEffect, createSignal, onMount, } from "solid-js";
import { debouce, availableSections } from './utils';
import Canvas from './canvas/Canvas'
import LoadingPage from './sections/LoadingPage';
import JumpableSection from './sections/JumpableSection';
import MainSection  from './sections/MainSection';
import BlogSection from './sections/Blog/BlogSection';
import ProjectSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import Menu from './components/Menu'
import SectionCounter from './components/SectionCounter';
import Socials from './components/socials';
import ScrollPointer from "./components/ScrollPointer"

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
            if (event.deltaY < 100) {
                setSection(Math.max(1, section() - 1));
            } else {
                setSection(Math.min(section() + 1, sectionsRefs.size));
            }
        }), false);

        const scrollToSection = () => {
            sectionsRefs.get(section() - 1)!.scrollIntoView({
                behavior: "smooth"
            })
        }

        createEffect(() => { scrollToSection() });

        canvas = new Canvas(canvasElement);
        canvas.addOnProgressCallback(setProgress);
        canvas.start();
        canvas.render();
    })

    return (
        <>
            <canvas ref={canvasElement} id="CanvasDisplay" class="fixed"/>
            <LoadingPage progress={progress} />
            <Menu setSection={setSection} />
            <main ref={mainElement} class="relative max-h-screen overflow-y-hidden no-scrollbar pointer-events-none">
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.index} shoudlBeBlurred={false}>
                    <MainSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.projects} shoudlBeBlurred={true}>
                    <ProjectSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.blog} shoudlBeBlurred={true}>
                    <BlogSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.about} shoudlBeBlurred={true}>
                    <AboutSection/>
                </JumpableSection>
            </main>
            <SectionCounter currentSection={section} />
            <ScrollPointer currentSection={section} maxSection={4}/>
            <Socials shouldHideOnMobile={true}/>
        </>
    )
}