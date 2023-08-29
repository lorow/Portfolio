
import './styles/counter.scss'

export default function SectionCounter(props: any) {
    const baseNumberStyle = "m-0 p-0 text-3xl sm:text-7xl absolute active"

    const isActive = (sectionToCheck: number) => ({
        active: props.currentSection() === sectionToCheck,
        inactive: props.currentSection() !== sectionToCheck
    })

    return (
        <div class="fixed flex-row left-5 sm:left-20 bottom-5 sm:bottom-10 text-white overflow-y-hidden w-[4rem] sm:w-[10rem]" id="page-counter">
            <span class="m-0 p-0 text-3xl sm:text-7xl">/0</span>
            <div class="inline-block m-0 p-0">
                <div class="overflow-hidden flex flex-col">
                    <span classList={isActive(1)} class={baseNumberStyle}>1</span>
                    <span classList={isActive(2)} class={baseNumberStyle}>2</span>
                    <span classList={isActive(3)} class={baseNumberStyle}>3</span>
                    <span classList={isActive(4)} class={baseNumberStyle}>4</span>
                </div>
            </div>
        </div>
    )
}
