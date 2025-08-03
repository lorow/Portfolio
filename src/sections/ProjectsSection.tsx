import { inView, animate, stagger } from "motion"
import { createEffect, JSXElement, onMount, createSignal } from "solid-js"


interface projectItemProps {
  link: string,
  children: JSXElement,
  registerSelf: (ref: HTMLElement) => void,
  title: string
}

function ProjectItem(props: projectItemProps) {
  let projectRef!: HTMLElement;
  onMount(() => props.registerSelf(projectRef));

  return (
    <article class="flex flex-col gap-2 opacity-0" ref={projectRef}>
      <h2 class="text-xl sm:text-3xl text-white">{props.title}</h2>
      {props.children}
      <div class="flex flex-row-reverse">
        <a href={props.link} class="text-base opacity-70 hover:opacity-100 ease-in-out duration-200">Check it out! <p class="inline">&#8594;</p></a>
      </div>
    </article>
  )
}


export default function ProjectSection() {
  const [registeredProjects, setRegisteredProjects] = createSignal<HTMLElement[]>([]);
  const addRef = (ref: HTMLElement) => setRegisteredProjects([...registeredProjects(), ref])


  createEffect(() => {
    inView("#projects-list", (_) => {

      animate(
        registeredProjects(),
        { opacity: 1 },
        { delay: stagger(0.2) }
      );
    },
      { amount: 0.3 }
    );
  });

  return (
    <>
      <div class="flex text-white md:pl-20 sm:pt-10 pt-5 w-full pointer-events-auto">
        <div class="flex flex-col max-lg ml-5">
          <h1 class="text-5xl sm:text-7xl antialiased mt-7 sm:mt-0">Projects</h1>
          <p class="text-1xl sm:text-2xl">Things I loved working on, and I'm proud of.</p>
          <p class="text-1xl sm:text-2xl">Checkout my github for more!</p>
        </div>
      </div>
      <div id="projects-list" class="relative text-white pl-5 pr-5 md:pl-20 md:ml-20 w-fit pt-10 flex flex-col gap-2 pointer-events-auto">
        <ProjectItem
          title="/01 - EyeTrackVR"
          link="https://github.com/eyetrackvr/eyetrackvr"
          registerSelf={addRef}
        >
          <div>
            <p>ETVR is an open source and open hardware, completely DIY solution</p>
            <p>which allows users to add eye tracking to almost any existing VR headset</p>
          </div>
        </ProjectItem>

        <ProjectItem
          title="/02 - OpenIris"
          link="https://github.com/lorow/openiris-espidf/"
          registerSelf={addRef}
        >
          <div>
            <p>OpenIris is the firmware part of the EyeTrackVRR project.</p>
            <p>It handles video streaming form users headset as well as the</p>
            <p>configuration, device discovery, state notification and more!</p>
          </div>
        </ProjectItem>

        <ProjectItem
          title="/03 - OSCMessageTool"
          link="https://github.com/lorow/OSCMessageTool"
          registerSelf={addRef}
        >
          <div>
            <p>A tool I made to help test out my VRCFaceTracking module for EyeTrackVR,</p>
            <p>and to play around with TUIs.</p>
            <p>It simulates real world usage by sending semi-real OSC messages, </p>
            <p>just as if it was ETVR itself.</p>
          </div>
        </ProjectItem>

        <ProjectItem
          title="/04 - EBookAPI"
          link="https://github.com/lorow/ebookapi/"
          registerSelf={addRef}
        >
          <div>
            <p>A toy project, an excuse to step out of Django world and try out FastAPI and friends</p>
            <p>The idea was to create a system which can pre-process,</p>
            <p>and serve e-books from you local PC over an API</p>
          </div>
        </ProjectItem>

        <ProjectItem
          title="/05 - GODiff"
          link="https://github.com/lorow/godiff"
          registerSelf={addRef}
        >
          <div>
            <p>Another toy project, another excuse to learn something new!</p>
            <p>This time it's Golang and TUIs as a whole.</p>
            <p>The idea behind this tool is to have a simple utility, with which I can quickly debug web services</p>
          </div>
        </ProjectItem>

        <ProjectItem
          title="/06 -And More!"
          link="https://github.com/lorow/"
          registerSelf={addRef}
        >
          <div>
            <p>You can find a lot more of my projects on my github!</p>
          </div>
        </ProjectItem>
      </div>
    </>
  )
} 