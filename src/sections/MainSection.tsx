import GlitchedLetter from "../components/GlitchedLetter";
import Typewritter from "../components/typrewritter";

const MainSection = () => {
  return (
    <div class="text-white md:pl-20 pt-2 sm:pt-10 w-full pointer-events-auto">
      <article class="flex flex-col lg:flex-row max-lg ml-5">
        <h1 class="text-5xl sm:text-8xl antialiased leading-[10rem] h-[2rem] sm:h-[4rem]">
          Hi
          <GlitchedLetter letter="!" />
        </h1>
        <div class="flex flex-col justify-center pt-[5rem] sm:pt-[3rem]">
          <p class="text-2xl sm:text-3xl">I'm Lorow</p>
          <span class="text-2xl sm:text-3xl flex">And I'm
            {/* span to fix spacing issues */}
            <span class="ml-2"></span>
            <Typewritter
              words={[
                "a Backend developer.",
                "a Creative person.",
                "A Tinkerer.",
                "A VR enjoyer",
              ]}
              className="text-2xl sm:text-3xl flex"
              cursorClassName="ml-2 text-sky-400"
              currentSection={1}
              typeWriterSection={1}
            />
          </span>
          <p class="text-2xl sm:text-3xl">Nice to meet you.</p>
        </div>
      </article>
    </div>
  )
}

export default MainSection;