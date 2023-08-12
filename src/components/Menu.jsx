import './styles/menu.scss'

export default function Menu(props) {
    let setSection = props.setSection;
    const HandleRouteSwitch = (route) => {
        // tood add routing and turn off the menu
        setSection(route);
    }

    return (
        <>
        <input type="checkbox" id="burger-toggle"></input>
        <label for="burger-toggle" class="burger-menu">
            <div class="line"></div>
            <div class="line"></div>
            <div class="line"></div> 
        </label>
    
        <div class="menu flex flex-col gap-6">
            <div class="menu-item">
                <a class="menu-item-link" href="#blog" onClick={() => HandleRouteSwitch(1)}>/Blog</a>
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
                <a class="menu-item-link" href="#blog" onClick={() => HandleRouteSwitch(2)}>/Works</a>
                <div class="marquee">
                    <div class="marquee-inner" aria-hidden="true">
                        <span>Works</span>
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
                <a class="menu-item-link" href="#blog" onClick={() => HandleRouteSwitch(3)}>/About</a>
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
        </div>
        </>
    )
}