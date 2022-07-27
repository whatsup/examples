import { observable } from 'whatsup'
import { Div } from './color_box.scss'

export function* ColorBox() {
    const color = observable('coral')
    const onClick = () => color(color() === 'coral' ? 'green' : 'coral')

    while (true) {
        const isCoral = color() === 'coral'
        const isGreen = color() === 'green'

        yield <Div css:box css:coral={isCoral} css:green={isGreen} onClick={onClick} />
    }
}
