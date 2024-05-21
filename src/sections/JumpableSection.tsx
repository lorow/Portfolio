import { JSXElement, onMount } from "solid-js";

interface JumpableSectionProps {
  pointerEventsOnSmallScreen: boolean;
  registerSelf: (ref: HTMLElement) => void;
  sectionName: string;
  children: JSXElement
}

export default function JumpableSection(props: JumpableSectionProps) {
  let sectionRef!: HTMLElement;
  onMount(() => props.registerSelf(sectionRef))

  return (
    <section id={props.sectionName} ref={sectionRef} class={`${props.pointerEventsOnSmallScreen ? "pointer-events-auto lg:pointer-events-none" : ""} pb-1 w-full min-h-screen sm:overflow-hidden`}>
      {props.children}
    </section>
  )
}