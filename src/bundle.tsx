/// <reference path="./@types/index.d.ts" />

import styles, { Div } from './bundle.scss'
import { Route, RouteLink } from 'whatsup/route'
import { cssx } from 'whatsup/cssx'
import { render } from 'whatsup/jsx'
import { App as Todos } from './todos'
import { App as Sierpinski } from './sierpinski'
import { App as Loadable } from './loadable'

const RouteLinkX = cssx(RouteLink, styles)

function App() {
    return (
        <Div>
            <Route path="/todos" component={Todos} />
            <Route path="/sierpinski" component={Sierpinski} />
            <Route path="/loadable" component={Loadable} />
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
                </Div>
            </Div>
        </Div>
    )
}

render(<App />)
