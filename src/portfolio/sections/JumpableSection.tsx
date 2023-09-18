import { JSXElement, onMount } from "solid-js";

interface JumpableSectionProps {
    shoudlBeBlurred: boolean;
    pointerEventsOnSmallScreen: boolean;
    registerSelf: (sectionName: number, ref: HTMLElement) => void;
    sectionIndex: number;
    children: JSXElement
}

export default function JumpableSection(props: JumpableSectionProps){
    let sectionRef!: HTMLElement;
    onMount(() => props.registerSelf(props.sectionIndex, sectionRef))

    return (
        <section ref={sectionRef} class={`${props.shoudlBeBlurred ? "backdrop-blur-lg" : ""} ${props.pointerEventsOnSmallScreen ? "pointer-events-auto lg:pointer-events-none" : ""} w-full h-screen sm:overflow-hidden`}>
            {props.children}
        </section>
    )
}