export interface ArticleProps {
  title: string
  brief: string
  url: string
}

export default function Article(props: ArticleProps) {
  return (
    <article class="border border-neutral-600 flex flex-col w-[20rem] h-[25rem] backdrop-blur rounded-md gap-5 justify-between hover:scale-[1.05] ease-in-out duration-200">
      <div class="flex flex-col gap-1 just mt-2">
        <title class="block text-xl mt-1 ml-3 ">{props.title}</title>
        {/* a separatator */}
        <div class="bg-white w-5/6 h-[0.05rem] self-center"></div>
      </div>
      <div class="ml-3 grow truncate whitespace-pre-line">
        {props.brief}
      </div>
      <div class="flex flex-col gap-3 justify-self-end mb-4">
        <div class="bg-white w-5/6 h-[0.05rem] self-center"></div>
        <a href={props.url} class="justify-self-center self-center">Check it out! &#8594; </a>
      </div>
    </article>
  )
}