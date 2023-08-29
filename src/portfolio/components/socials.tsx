import './styles/socials.scss'
 
interface Props {
    shouldHideOnMobile: boolean
}


export default function Socials(props: Props) {
    return (
        // todo make this appear in the menu on mobile
        <div classList={{"md:visible": props.shouldHideOnMobile }} class="invisible fixed bottom-10 right-20 flex gap-2">
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
