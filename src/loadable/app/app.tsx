import { Div } from './app.scss'
import { Friends } from './friends'
import { Groups } from './groups'
import { Menu } from './menu'

export function App() {
    return (
        <Div container>
            <Div logo>Loadable</Div>
            <Menu />
            <Div header>Fractal sets</Div>
            <Groups />
            <Friends />
        </Div>
    )
}
