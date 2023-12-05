import { JSXElement, onMount } from "solid-js";

interface JumpableSectionProps {
    pointerEventsOnSmallScreen: boolean;
    registerSelf: (sectionName: number, ref: HTMLElement) => void;
    sectionIndex: number;
    sectionName: string;
    children: JSXElement
}

export default function JumpableSection(props: JumpableSectionProps){
    let sectionRef!: HTMLElement;
    onMount(() => props.registerSelf(props.sectionIndex, sectionRef))

    return (
        <section id={props.sectionName} ref={sectionRef} class={`${props.pointerEventsOnSmallScreen ? "pointer-events-auto lg:pointer-events-none" : ""} ${props.sectionIndex > 0 ? "pt-1": "" } pb-1 w-full min-h-screen sm:overflow-hidden`}>
            {props.children}
        </section>
    )
}