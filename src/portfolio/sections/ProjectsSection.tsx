export default function ProjectSection() {
    return (
        <section class="w-full h-screen">
            <div class="flex text-white pl-20 pt-10 w-full pointer-events-auto">
                <div class="flex flex-col max-lg ml-5">
                    <h1 class="text-8xl antialiased leading-[10rem]">Projects</h1>
                    <p class="text-3xl">Things I loved working on,</p>
                    <p class="text-3xl">and I'm proud of.</p>
                </div>
            </div>

            <div class="relative text-white pl-20 pt-10 w-full pointer-events-auto flex flex-col">
                <article>
                    <h2>EyeTrackVR</h2>
                    <div>
                        <p>ETVR is an open source and open hardware, completely DIY solution</p>
                        <p>that allows any VR headset to add Eye Tracking</p>
                    </div>
                    <div>
                        <a href="https://github.com/eyetrackvr/eyetrackvr/">Check it out!</a>
                    </div>
                </article>

                <article>
                    <h2>OpenIris</h2>
                    <div>
                        <p>It's the firmware part of the ETVR project. It handles a lot,</p>
                        <p>from the device discovery, through configuration management and streaming</p>
                    </div>
                    <div>
                        <a href="https://github.com/eyetrackvr/OpenIris/">Check it out!</a>
                    </div>
                </article>

                <article>
                    <h2>OpenIris</h2>
                    <div>
                        <p>It's the firmware part of the ETVR project. It handles a lot,</p>
                        <p>from the device discovery, through configuration management and streaming</p>
                    </div>
                    <div>
                        <a href="https://github.com/eyetrackvr/OpenIris/">Check it out!</a>
                    </div>
                </article>
            </div>
        </section>
    )
} 