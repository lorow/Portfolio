export default function AboutSection() {
  return (
    <>
      <div class="flex text-white md:pl-20 pt-2 sm:pt-10 w-full pointer-events-auto">
        <div class="flex flex-col max-lg ml-5">
          <h1 class="text-5xl sm:text-7xl antialiased mt-7 sm:mt-0">About</h1>
          <p class="text-1xl sm:text-2xl">To tell you the truth, I'm no magician.</p>
          <p class="text-1xl sm:text-2xl">But I do make stuff work!</p>
        </div>
      </div>

      <div >

        <div class="text-white flex flex-col gap-10 md:text-lg pt-5 xl:mt-10 pl-7 lg:ml-20 pr-2 md:pl-5 lg:w-[50vw] pointer-events-auto">
          <div class="text-white flex flex-col gap-2 md:text-lg">
            <span>Hey there! I'm Zdzisław, a passionate backend developer who's always tinkering with something. Be it new language, new framework, new tech.</span>
            <span>There's always something new to learn, and that keeps me hooked, so if I find it interesting I will find a way to try it out</span>
            <span>Right now, I'm learning more about VR/AR and ML, working on cool stuff like ETVR.</span>
          </div>

          <div class="text-white flex flex-col gap-2 md:text-lg">
            <span>But it's not just work that makes us tick</span>
            <span>I've recently picked up a hobby of taking pictures of the worlds I explore in VR in VRChat, though I don't have them posted anywhere yet.</span>
            <span>I find it quite amazing to be able to explore something shy of pure creators' imagination. To see and experience what they imagined in so many more ways.</span>
          </div>

          <span>Outside of VR, I'm a big fan of EUCs, there's nothing like it. The sensation of the air rushing past, the seamless connection between me and the machine — it's an exhilarating experience that feels almost like flying. Plus, it's undeniably cool! </span>

          <span>Anyway, sorry for the rambling, and thanks for visiting!</span>
        </div>
      </div>
    </>
  )
}