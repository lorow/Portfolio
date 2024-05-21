// import Article from './Article.ts'

export default function BlogSection() {

  return (
    <>
      <div class="flex text-white md:pl-20 pt-2 sm:pt-10 w-full pointer-events-auto">
        <div class="flex flex-col max-lg ml-5">
          <h1 class="text-5xl sm:text-7xl antialiased mt-7 sm:mt-0">Blog</h1>
          <p class="text-1xl sm:text-2xl">A personal space where I rumble about stuff.</p>
        </div>
      </div>
      <span class="text-white opacity-30 text-[12rem] sm:text-[16rem] block ml-auto mr-auto h-fit w-fit">
        WIP
      </span>

      <span class="text-white opacity-80 text-lg sm:text-3xl block ml-auto mr-auto h-fit w-fit text-center">
        The Blog is currently under development, come back later!
      </span>

      {/* 
          <section class="flex gap-10 mt-[3rem] justify-center text-white pointer-events-auto">
              <Article title="A neat title" brief="some desc..." url="" />
              <Article title="A neat title" brief="some desc..." url="" />
              <Article title="A neat title" brief="some desc..." url="" />
          </section>
          <section class="flex justify-center text-white pointer-events-auto mt-10">
              <a href="" class="text-center leading-[3rem] border border-neutral-600 backdrop-blur w-[15rem] h-[3rem] block rounded hover:scale-[1.05] ease-in-out duration-200">
                  Or checkout the blog &#8594;
              </a>
          </section> */}
    </>
  )
}