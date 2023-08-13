import {createSignal} from "solid-js";
import Menu from '../components/Menu'
import SectionCounter from '../components/SectionCounter';
import Socials from '../components/socials';


export default function IndexPage() {
    const [section, setSection] = createSignal(1);

    return (
        <>
        <Menu setSection={setSection} />
        <div class="absolute flex text-white pl-20 pt-10 w-full">
            <main>
                <div class="flex max-lg:ml-5">
                    <div>
                        <p class="text-8xl antialiased leading-[10rem]">Hi!</p>
                    </div>
                    <div class="flex flex-col justify-center pt-20">
                        <p class="text-4xl">I'm Zdzisław</p>
                        <p class="text-4xl">And I'm a backend developer</p>
                    </div>
                </div>
            </main>
        </div>
        <SectionCounter section={section} />
        <Socials/>
        </>
    )
}