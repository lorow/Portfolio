export default function BlogSection(){
    return (
        <section class="w-full h-screen">
            <div class="flex text-white pl-20 pt-10 w-full pointer-events-auto">
                <div class="flex flex-col max-lg ml-5">
                    <h1 class="text-8xl antialiased leading-[10rem]">Blog</h1>
                    <p class="text-3xl">A personal space where I rumble about stuff.</p>
                </div>
            </div>

            <section class="flex align-items-center justfiy-center text-white">
                <article class="border flex flex-col">
                    <title>A neat title</title>
                    <div>
                        some desc...
                    </div>
                    <a>Check it out!</a>
                </article>
                <article class="border flex flex-col">
                    <title>A neat title</title>
                    <div>
                        some desc...
                    </div>
                    <a>Check it out!</a>
                </article>
                <article class="border flex flex-col">
                    <title>A neat title</title>
                    <div>
                        some desc...
                    </div>
                    <a>Check it out!</a>
                </article>
            </section>
        </section>
    )
}