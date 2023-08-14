import { createSignal, onMount, } from "solid-js";
import Canvas from './canvas/Canvas'
import MainSection  from './sections/MainSection';
import Menu from './components/Menu'
import SectionCounter from './components/SectionCounter';
import Socials from './components/socials';

export default function IndexPage() {
    const [section, setSection] = createSignal(1);
    let canvasElement!: HTMLCanvasElement;
    let canvas;

    onMount(() => {
        canvas = new Canvas(canvasElement);
        canvas.render();
    })

    return (
        <>
        <canvas id="CanvasDisplay" class="absolute" ref={canvasElement}></canvas>
        <Menu setSection={setSection} />
        <MainSection/>
        <SectionCounter section={section} />
        <Socials/>
        </>
    )
}