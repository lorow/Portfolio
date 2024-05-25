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
  href: string
}

function MenuItem(props: MenuItemProps) {
  let itemRef!: HTMLDivElement;
  onMount(() => props.registerSelf(itemRef));

  return (
    <div ref={itemRef} class="menu-item">
      <a class="menu-item-link" href={`#` + props.href} onClick={() => props.HandleRouteSwitch()}>/{props.routeName}</a>
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

  let menuToggle!: HTMLInputElement;
  const HandleRouteSwitch = (route: number) => {
    props.setSection(route);
    toggleMenuVisible(false);
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
      <input ref={menuToggle} onChange={() => toggleMenuVisible(!menuVisible())} checked={menuVisible()} type="checkbox" id="burger-toggle" />
      <label for="burger-toggle" class="burger-menu">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </label>

      <div id="menu-list" class="menu flex flex-col gap-6">
        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(1)}
          href='home'
          routeName="Home"
          subRouteName="Home"
          reapeatSubRouteNameTimes={10}
        />

        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(2)}
          href='projects'
          routeName="Projects"
          subRouteName="Works"
          reapeatSubRouteNameTimes={10}
        />

        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(3)}
          href='blog'
          routeName="Blog"
          subRouteName="Blog"
          reapeatSubRouteNameTimes={10}
        />

        <MenuItem
          registerSelf={addRef}
          HandleRouteSwitch={() => HandleRouteSwitch(4)}
          href='about'
          routeName="About"
          subRouteName="About"
          reapeatSubRouteNameTimes={10}
        />

        <Socials shouldHideOnMobile={false} isInMenu={true} />
      </div>
    </>
  )
}