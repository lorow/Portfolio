
import './styles/counter.scss'

export default function SectionCounter(props) {
    // TODO add animation on section change
    return (
        <div class="fixed left-20 bottom-10 text-white" id="page-counter">
            <span class="m-0 p-0 text-7xl">/0</span>
            <span class="m-0 p-0 text-7xl">{props.section()}</span>
        </div>
    )
}
