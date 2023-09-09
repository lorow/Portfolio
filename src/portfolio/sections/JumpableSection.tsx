import { JSXElement, onMount } from "solid-js";

interface JumpableSectionProps {
    shoudlBeBlurred: boolean;
    registerSelf: (sectionName: number, ref: HTMLElement) => void;
    sectionIndex: number;
    children: JSXElement
}

export default function JumpableSection(props: JumpableSectionProps){
    let sectionRef!: HTMLElement;
    onMount(() => props.registerSelf(props.sectionIndex, sectionRef))

    return (
        <section ref={sectionRef} class={`${props.shoudlBeBlurred ? "backdrop-blur-sm" : ""} w-full h-screen overflow-hidden`}>
            {props.children}
        </section>
    )
}