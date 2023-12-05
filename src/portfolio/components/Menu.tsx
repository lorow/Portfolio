import Socials from './socials';
import './styles/menu.scss'

export default function Menu(props: any) {
    let setSection = props.setSection;
    let menuToggle!: HTMLInputElement;
    const HandleRouteSwitch = (route: number) => {
        menuToggle.checked = false;
        setSection(route);
    }

    return (
        <>
        <input ref={menuToggle} type="checkbox" id="burger-toggle" />
        <label for="burger-toggle" class="burger-menu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div> 
        </label>
    
        <div class="menu flex flex-col gap-6">
        <div class="menu-item">
                <a class="menu-item-link" href="#home" onClick={() => HandleRouteSwitch(1)}>/Home</a>
                <div class="marquee">
                    <div class="marquee-inner" aria-hidden="true">
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                        <span>Home</span>
                    </div>
                </div>
            </div>
            <div class="menu-item">
                <a class="menu-item-link" href="#projects" onClick={() => HandleRouteSwitch(2)}>/Projects</a>
                <div class="marquee">
                    <div class="marquee-inner" aria-hidden="true">
                    <span>Projects</span>
                        <span>Works</span>
                        <span>Works</span>
                        <span>Works</span>
                        <span>Works</span>
                        <span>Works</span>
                        <span>Works</span>
                        <span>Works</span>
                    </div>
                </div>
            </div>
            <div class="menu-item">
                <a class="menu-item-link" href="#blog" onClick={() => HandleRouteSwitch(3)}>/Blog</a>
                <div class="marquee">
                    <div class="marquee-inner" aria-hidden="true">
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                        <span>Blog</span>
                    </div>
                </div>
            </div>
            <div class="menu-item">
                <a class="menu-item-link" href="#about" onClick={() => HandleRouteSwitch(4)}>/About</a>
                <div class="marquee">
                    <div class="marquee-inner" aria-hidden="true">
                        <span>About</span>
                        <span>About</span>
                        <span>About</span>
                        <span>About</span>
                        <span>About</span>
                        <span>About</span>
                        <span>About</span>
                        <span>About</span>
                    </div>
                </div>
            </div>
            <Socials shouldHideOnMobile={false}/>
        </div>
        </>
    )
}