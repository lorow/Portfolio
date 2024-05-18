import "../components/styles/GlitchedLetter.scss";

interface GlitchedLetterProps {
    letter: string;
}

export default function GlitchedLetter(propsL: GlitchedLetterProps){
 
    return (
        <h2 class="text-5xl sm:text-8xl antialiased leading-[10rem] h-[2rem] sm:h-[4rem] hero glitch layers" data-text={propsL.letter}>
            <span>
                {propsL.letter}
            </span>
        </h2>
    )
}