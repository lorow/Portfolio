import { JSXElement, onMount } from "solid-js";

interface JumpableSectionProps {
    registerSelf: (sectionName: number, ref: HTMLElement) => void;
    sectionIndex: number;
    children: JSXElement
}

export default function JumpableSection(props: JumpableSectionProps){
    let sectionRef!: HTMLElement;
    onMount(() => props.registerSelf(props.sectionIndex, sectionRef))

    return (
        <section ref={sectionRef} class="w-full h-screen">
            {props.children}
        </section>
    )
}