import "./styles/scrollPointer.scss"

export default function ScrollPointer(props: any) {
        return (
        <div class={(props.currentSection() === props.maxSection ? "fade-out"  : "fade-in") + " fixed left-1/2 bottom-[4.5rem] scroll"}></div>
    )
}