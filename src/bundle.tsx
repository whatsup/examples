/// <reference path="./@types/index.d.ts" />

import styles, { Div } from './bundle.scss'
import { Route, RouteLink } from 'whatsup/route'
import { cssx } from 'whatsup/cssx'
import { render } from 'whatsup/jsx'
import { App as Todos } from './todos'
import { App as Sierpinski } from './sierpinski'
import { App as Loadable } from './loadable'

const CSSXRouteLink = cssx(RouteLink, styles)

function App() {
    return (
        <Div container>
            <Route path="/todos" component={Todos} />
            <Route path="/sierpinski" component={Sierpinski} />
            <Route path="/loadable" component={Loadable} />
            <Div default>
                <Div header>Whatsup examples</Div>
                <Div flex>
                    <CSSXRouteLink button blue to="/todos">
                        Todos
                    </CSSXRouteLink>
                    <CSSXRouteLink button orange to="/loadable">
                        Loadable
                    </CSSXRouteLink>
                    <CSSXRouteLink button green to="/sierpinski">
                        Sierpinski
                    </CSSXRouteLink>
                </Div>
            </Div>
        </Div>
    )
}

render(<App />)
