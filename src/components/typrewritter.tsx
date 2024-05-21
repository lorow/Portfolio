import { cn } from "../utils"
import { createEffect, createSignal } from "solid-js"
import "../components/styles/typeWritter.scss"


interface TypewritterProps {
  words: string[],
  className?: string,
  cursorClassName?: string,
  currentSection: Number,
  typeWriterSection: Number,
}

enum TypeWriterState {
  INITIAL_DEYLAY,
  TYPE_WORD,
  WAIT_DELAY,
  ERASE_WORD,
  WAIT_AFTER_DELETE,
  CHANGE_WORD,
}


// inspired by https://ui.aceternity.com/components/typewriter-effect
export default function Typewritter(props: TypewritterProps){
  const [currentWordIndex, setCurrentWordIndex] = createSignal(0);
  const [currentCharIndex, setcurrentCharIndex] = createSignal(0);
  const [writingState, transitionWritingState] = createSignal(TypeWriterState.INITIAL_DEYLAY);
  const typingSpeed = 70;  // higher = slowerr

  const wordsArray = props.words.map((word) => {
    return word.split("")
  })

  createEffect(()=>{
      if (props.currentSection == props.typeWriterSection) {}

      switch(writingState()){
        case TypeWriterState.INITIAL_DEYLAY:
          setTimeout(() => {
            transitionWritingState(TypeWriterState.TYPE_WORD);
          }, 700);
          break; 
        case TypeWriterState.TYPE_WORD:
            if (currentCharIndex() < wordsArray[currentWordIndex()].length)
              setTimeout(()=> {
                setcurrentCharIndex(currentCharIndex() + 1);
              }, typingSpeed);
            else
              transitionWritingState(TypeWriterState.WAIT_DELAY);
            break;
          case TypeWriterState.WAIT_DELAY:
            setTimeout(() => {
              transitionWritingState(TypeWriterState.ERASE_WORD);
            }, 4000)
          break;
          case TypeWriterState.ERASE_WORD:
            if (currentCharIndex() > 0)
              setTimeout(()=> {
                setcurrentCharIndex(currentCharIndex() - 1);
              }, typingSpeed);
            else
              transitionWritingState(TypeWriterState.WAIT_AFTER_DELETE);
          break;
          case TypeWriterState.WAIT_AFTER_DELETE:
            setTimeout(() => {
              transitionWritingState(TypeWriterState.CHANGE_WORD);
            }, 1200)
            break;
          case TypeWriterState.CHANGE_WORD:
            if (currentWordIndex() < wordsArray.length - 1)
              setCurrentWordIndex(currentWordIndex() + 1);
            else
              setCurrentWordIndex(0);
            transitionWritingState(TypeWriterState.TYPE_WORD);
          break;
      }
    });

  return (
    <div class={cn(props.className)}>
      <div class="inline">
          <span>{wordsArray[currentWordIndex()].slice(0, currentCharIndex())}</span>
        </div>
      <div class="cursor">|</div>
    </div>
  )
}
