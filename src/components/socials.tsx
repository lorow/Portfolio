import './styles/socials.scss'

interface Props {
    shouldHideOnMobile: boolean
    isInMenu: boolean
}


export default function Socials(props: Props) {
    return (
        <div
            class={
                `${props.shouldHideOnMobile ? "md:visible invisible" : "md:invisible visible"}
                fixed flex gap-2 bottom-10 left-[50%] 
                ${props.isInMenu ?
                    "transform-gpu translate-x-[-50%] translate-y-[-50%]"
                    :
                    "sm:right-20 right-0 ml-[-70px] sm:ml-0 md:left-auto"
                }
                `
            }>
            <a href="https://github.com/lorow" class="github h-6 w-6"></a>
            <div class="flex flex-row gap-2 place-items-center">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <a href="https://www.linkedin.com/in/lorow/" class="linkedin h-6 w-6"></a>
        </div>
    )
}
