import './global.scss';
import { createSignal, onMount, } from "solid-js";
import { debouce } from './utils';
import Canvas from './canvas/Canvas'
import MainSection  from './sections/MainSection';
import BlogSection from './sections/BlogSection';
import ProjectSection from './sections/ProjectsSection';
import Menu from './components/Menu'
import SectionCounter from './components/SectionCounter';
import Socials from './components/socials';

export default function IndexPage() {
    const [section, setSection] = createSignal(1);
    const [progress, setProgress] = createSignal(0);
    let canvasElement!: HTMLCanvasElement;
    let canvas;
    let mainElement!: HTMLElement;

    onMount(() => {
        const scrollStep = window.innerHeight;
        
        window.addEventListener("wheel", debouce((event: WheelEvent) => {
            let scrollDirection = event.deltaY < 100 ? -scrollStep : scrollStep;
            mainElement.scrollBy({
                top: scrollDirection,
                behavior: "smooth"
            }); 
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
            <main ref={mainElement} class="relative max-h-screen overflow-y-scroll no-scrollbar pointer-events-none">
                <MainSection />
                <ProjectSection />    
                <BlogSection />
            </main>
            <SectionCounter section={section} />
            <Socials/>
        </>
    )
}