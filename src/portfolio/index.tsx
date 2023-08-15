import './global.scss';
import { createSignal, onMount, } from "solid-js";
import Canvas from './canvas/Canvas'
import MainSection  from './sections/MainSection';
import BlogSection from './sections/BlogSection';
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
        window.addEventListener("wheel", (event: WheelEvent) => {
            mainElement.style.pointerEvents = "auto";
            setTimeout(() => {
                mainElement.style.pointerEvents = "none";
            }, 100);
        }, false);

        canvas = new Canvas(canvasElement);
        canvas.addOnProgressCallback(setProgress);
        canvas.start();
        canvas.render();
    })

    return (
        <>
            <canvas ref={canvasElement} id="CanvasDisplay" class="fixed"/>
            <Menu setSection={setSection} />
            <main ref={mainElement} class="relative max-h-screen overflow-y-scroll no-scrollbar snap snap-y snap-mandatory pointer-events-none">
                <MainSection/>
                <BlogSection />
            </main>
            <SectionCounter section={section} />
            <Socials/>
        </>
    )
}