import { Div } from './app.scss'
import { Friends } from './friends'
import { Groups } from './groups'
import { Menu } from './menu'

export function App() {
    return (
        <Div css:container>
            <Div css:logo>Loadable</Div>
            <Menu />
            <Div css:header>Fractal sets</Div>
            <Groups />
            <Friends />
        </Div>
    )
}
