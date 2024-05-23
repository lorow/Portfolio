import { createEffect, createSignal, onMount } from 'solid-js';
import { animate, stagger } from 'motion';
import Socials from './socials';
import './styles/menu.scss'

interface MenuItemProps {
  registerSelf: (ref: HTMLElement) => void,
  HandleRouteSwitch: () => void,
  routeName: string,
  subRouteName: string
  reapeatSubRouteNameTimes: number,
}

function MenuItem(props: MenuItemProps) {
  let itemRef!: HTMLDivElement;
  onMount(() => props.registerSelf(itemRef));

  return (
    <div ref={itemRef} class="menu-item">
      <a class="menu-item-link" href="#home" onClick={() => props.HandleRouteSwitch()}>/{props.routeName}</a>
      <div class="marquee">
        <div class="marquee-inner" aria-hidden="true">
          {Array.from(Array(props.reapeatSubRouteNameTimes)).map((_) => <span>{props.subRouteName}</span>)}
        </div>
      </div>
    </div>
  )
}

export default function Menu(props: any) {
  const [menuVisible, toggleMenuVisible] = createSignal(false);

  const [registeredItems, setRegisteredItems] = createSignal<HTMLElement[]>([]);
  const addRef = (ref: HTMLElement) => setRegisteredItems([...registeredItems(), ref]);

  let setSection = props.setSection;
  let menuToggle!: HTMLInputElement;
  const HandleRouteSwitch = (route: number) => {
    setSection(route);
  }

  createEffect(() => {
    if (registeredItems().length === 0)
      return;

    if (menuVisible()) {
      animate(registeredItems(),
        { opacity: 1 },
        { delay: stagger(0.3) }
      );
    }
    else {
      animate(registeredItems(),
        { opacity: 0 },
        { delay: 0 }
      );
    }
  });

  return (
    <>
      <input ref={menuToggle} onChange={() => toggleMenuVisible(!menuVisible())} type="checkbox" id="burger-toggle" />
      <label for="burger-toggle" class="burger-menu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </label>

      <div id="menu-list" class="menu flex flex-col gap-6">
        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(1)}
          routeName="Home"
          subRouteName="Home"
          reapeatSubRouteNameTimes={10}
        />

        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(2)}
          routeName="Projects"
          subRouteName="Works"
          reapeatSubRouteNameTimes={10}
        />

        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(3)}
          routeName="Blog"
          subRouteName="Blog"
          reapeatSubRouteNameTimes={10}
        />

        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(4)}
          routeName="About"
          subRouteName="About"
          reapeatSubRouteNameTimes={10}
        />

        <Socials shouldHideOnMobile={false} />
      </div>
    </>
  )
}