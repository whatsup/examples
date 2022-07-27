/// <reference path="./@types/index.d.ts" />

import styles, { Div } from './bundle.scss'
import { Route, RouteLink } from 'whatsup/route'
import { cssx } from 'whatsup/cssx'
import { render } from 'whatsup/jsx'
import { App as Todos } from './todos'
import { App as Sierpinski } from './sierpinski'
import { App as Loadable } from './loadable'
import { App as ThemeToggle } from './theme_toggle'
import { App as ColorBox } from './color_box'

const RouteLinkX = cssx(RouteLink, styles)

function App() {
    return (
        <Div>
            <Route path="/todos" component={Todos} />
            <Route path="/sierpinski" component={Sierpinski} />
            <Route path="/loadable" component={Loadable} />
            <Route path="/theme-toggle" component={ThemeToggle} />
            <Route path="/color-box" component={ColorBox} />
            <Div css:default>
                <Div css:header>Whatsup examples</Div>
                <Div css:flex>
                    <RouteLinkX css:button css:blue to="/todos">
                        Todos
                    </RouteLinkX>
                    <RouteLinkX css:button css:orange to="/loadable">
                        Loadable
                    </RouteLinkX>
                    <RouteLinkX css:button css:green to="/sierpinski">
                        Sierpinski
                    </RouteLinkX>
                    <RouteLinkX css:button css:teal to="/theme-toggle">
                        Theme Toggle
                    </RouteLinkX>
                </Div>
            </Div>
        </Div>
    )
}

render(<App />)
