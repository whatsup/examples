import { Computed, computed, observable } from 'whatsup'
import { Context, createKey } from 'whatsup/jsx'
import { Div } from './app.scss'

const TIMER = createKey<Computed<number>>()

const timer = computed(function* () {
    const counter = observable(0)

    let timeoutId: number

    try {
        while (true) {
            const count = counter()

            timeoutId = window.setTimeout(() => counter(count === 9 ? 0 : count + 1), 1000)

            yield count
        }
    } finally {
        clearTimeout(timeoutId!)
    }
})

const scaler = computed(function* () {
    const elapsed = observable(0)

    let rafId: number

    try {
        while (true) {
            rafId = requestAnimationFrame((e) => elapsed(e))

            const e = (elapsed() / 1000) % 10

            yield 1 + (e > 5 ? 10 - e : e) / 10
        }
    } finally {
        cancelAnimationFrame(rafId!)
    }
})

function* Dot(this: Context) {
    const timer = this.find(TIMER)
    const hovered = observable(false)

    const onMouseOver = () => hovered(true)
    const onMouseOut = () => hovered(false)

    while (true) {
        const text = hovered() ? `*${timer()}*` : timer()

        yield (
            <Div css:dot css:hovered={hovered()} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
                {text}
            </Div>
        )
    }
}

interface TriangleProps {
    depth: number
}

function Triangle(props: TriangleProps) {
    const { depth } = props

    return (
        <Div css:triangle>
            <Layer depth={depth} />
            <Layer depth={depth} />
            <Layer depth={depth} />
        </Div>
    )
}

interface LayerProps {
    depth: number
}

function Layer(props: LayerProps) {
    const { depth } = props
    return depth === 0 ? <Dot /> : <Triangle depth={depth - 1} />
}

export function* App(this: Context) {
    this.share(TIMER, timer)

    while (true) {
        const transform = `scaleX(${scaler()})`

        yield (
            <Div css:container style={{ transform }}>
                <Triangle depth={5} />
            </Div>
        )
    }
}
