import { createEffect, createSignal } from "solid-js"
import "../components/styles/loadingPage.scss"

export default function LoadingPage(props: any) {
  const [shouldFadeout, setShouldFadeOut] = createSignal(false);

  createEffect(() => {
    if (props.progress() >= 100) {
      setTimeout(() => { setShouldFadeOut(true) }, 300);
    }
  });

  return (
    <section
      classList={{ "opacity-100": !shouldFadeout(), "opacity-0": shouldFadeout(), visible: !shouldFadeout(), invisible: shouldFadeout() }}
      class="bg-black fixed w-full h-screen z-[999] ease-in-out duration-1000"
    >
      <div class="center">
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
        <div class="wave"></div>
      </div>
    </section>
  )
}