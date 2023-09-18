import "./styles/scrollPointer.scss"

interface IProps{
    currentSection: () => number;
    maxSection: number;
}

export default function ScrollPointer(props: IProps) {
        return (<div class={`${props.currentSection() === props.maxSection ? "fade-out"  : "fade-in"} invisible sm:visible fixed left-1/2 bottom-[4.5rem] scroll`}></div>
    )
}