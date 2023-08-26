import Article from './Article'

export default function BlogSection(){

    return (
        <>
            <div class="flex text-white pl-20 pt-10 w-full pointer-events-auto">
                <div class="flex flex-col max-lg ml-5">
                    <h1 class="text-8xl antialiased leading-[10rem]">Blog</h1>
                    <p class="text-3xl">A personal space where I rumble about stuff.</p>
                </div>
            </div>

            <section class="flex gap-10 mt-[3rem] justify-center text-white pointer-events-auto">
                <Article title="A neat title" brief="some desc..." url="" />
                <Article title="A neat title" brief="some desc..." url="" />
                <Article title="A neat title" brief="some desc..." url="" />
            </section>
            <section class="flex justify-center text-white pointer-events-auto mt-10">
                <a href="" class="text-center leading-[3rem] border border-neutral-600 backdrop-blur w-[15rem] h-[3rem] block rounded hover:scale-[1.05] ease-in-out duration-200">
                    Or checkout the blog &#8594;
                </a>
            </section>
        </>
    )
}