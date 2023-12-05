import './global.scss';
import { createEffect, createSignal, onMount, } from "solid-js";
import { debouce, availableSections, sectionNameToNumber } from './utils';
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

    let options = {
        rootMargin: "-25px",
        threshold: 0.5,
    };


    const onSectionEntered = (entries: Array<IntersectionObserverEntry>, observer: IntersectionObserver) => {
        let sectionId = 1;
        var visibleEntries = entries.filter((entry) => entry.isIntersecting);
        console.log(visibleEntries);

        var lastEntry = visibleEntries.pop();
        if(!lastEntry){
            return;
        }

        sectionId = sectionNameToNumber[lastEntry.target.id];

        if (Math.abs(sectionId - section())){
            setSection(sectionId);
            console.log(section(), sectionId);
        }
    }

    let observer = new IntersectionObserver(onSectionEntered, options);

    const addRef = (sectionName: number , ref: HTMLElement) => {
        observer.observe(ref);
    }

    onMount(() => {        
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
            <main ref={mainElement} class="relative no-scrollbar pointer-events-none">
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.index} sectionName={"home"} pointerEventsOnSmallScreen={false}>
                    <MainSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.projects} sectionName={"projects"} pointerEventsOnSmallScreen={true}>
                    <ProjectSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.blog} sectionName={"blog"} pointerEventsOnSmallScreen={true}>
                    <BlogSection/>
                </JumpableSection>
                <JumpableSection registerSelf={addRef} sectionIndex={availableSections.about} sectionName={"about"} pointerEventsOnSmallScreen={true}>
                    <AboutSection/>
                </JumpableSection>
            </main>
            <SectionCounter currentSection={section} />
            <ScrollPointer currentSection={section} maxSection={4}/>
            <Socials shouldHideOnMobile={true}/>
        </>
    )
}