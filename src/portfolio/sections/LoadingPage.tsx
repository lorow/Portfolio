export default function LoadingPage(props: any) {
 return (   
    <section classList={{visible: props.progress() !== 100, invisible: props.progress() === 100}} class=" bg-black fixed w-full h-screen z-[999]">
        <span class="text-white text-5xl">LOADING: {props.progress()}</span>
    </section>
 )
}