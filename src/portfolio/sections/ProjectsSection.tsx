export default function ProjectSection() {
    return (
        <>
            <div class="flex text-white pl-20 pt-10 w-full pointer-events-auto">
                <div class="flex flex-col max-lg ml-5">
                    <h1 class="text-7xl antialiased leading-[10rem] h-32">Projects</h1>
                    <p class="text-2xl">Things I loved working on, and I'm proud of.</p>
                    <p class="text-2xl">Checkout my github for more!</p>
                </div>
            </div>

            <div class="relative text-white pl-20 ml-20 w-fit pt-10 flex flex-col gap-2 pointer-events-auto">
                <article class="flex flex-col gap-2">
                    <h2 class="text-3xl text-white">/01 - EyeTrackVR</h2>
                    <div>
                        <p>ETVR is an open source and open hardware, completely DIY solution</p>
                        <p>which allows users to add eye tracking to almost any existing VR headset</p>
                    </div>
                    <div class="flex flex-row-reverse">
                        <a href="https://github.com/eyetrackvr/eyetrackvr/" class="text-base opacity-70 hover:opacity-100 ease-in-out duration-200">Check it out! <p class="inline">&#8594;</p></a>
                    </div>
                </article>

                <article class="flex flex-col gap-2">
                    <h2 class="text-3xl text-white">/02 - OpenIris</h2>
                    <div>
                        <p>OpenIris is the firmare part of the EyeTrack project.</p>
                        <p>It handles video streaming form users headset as well as the</p>
                        <p>configuration, device discovery, state notification and more!</p>
                    </div>
                    <div class="flex flex-row-reverse">
                        <a href="https://github.com/eyetrackvr/openiris/" class="text-base opacity-70 hover:opacity-100 ease-in-out duration-200">Check it out! <p class="inline">&#8594;</p></a>
                    </div>
                </article>

                <article class="flex flex-col gap-2">
                    <h2 class="text-3xl text-white">/03 - EBookAPI</h2>
                    <div>
                        <p>A toy project, an excuse to step out of Django world</p>
                        <p>and try out FastAPI and friends</p>
                    </div>
                    <div class="flex flex-row-reverse">
                        <a href="https://github.com/lorow/ebookapi/" class="text-base opacity-70 hover:opacity-100 ease-in-out duration-200">Check it out! <p class="inline">&#8594;</p></a>
                    </div>
                </article>

                
                <article class="flex flex-col gap-2">
                    <h2 class="text-3xl text-white">/04 - PlaceitGo</h2>
                    <div>
                        <p>Another top project, another excuse to learn something!</p>
                        <p>This time it's Golang and the project is a placekitten lookalike</p>
                    </div>
                    <div class="flex flex-row-reverse">
                        <a href="https://github.com/lorow/placeitgo/" class="text-base opacity-70 hover:opacity-100 ease-in-out duration-200">Check it out! <p class="inline">&#8594;</p></a>
                    </div>
                </article>

            </div>
        </>
    )
} 