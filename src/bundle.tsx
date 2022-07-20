/// <reference path="./@types/index.d.ts" />

import styles, { Div } from './bundle.scss'
import { Route, RouteLink } from 'whatsup/route'
import { render } from 'whatsup/jsx'
import { App as Todos } from './todos'
import { App as Sierpinski } from './sierpinski'
import { App as Loadable } from './loadable'

function App() {
    return (
        <Div container>
            <Route path="/todos" component={Todos} />
            <Route path="/sierpinski" component={Sierpinski} />
            <Route path="/loadable" component={Loadable} />
            <Div default>
                <Div header>Whatsup examples</Div>
                <Div flex>
                    <RouteLink className={styles.button + ' ' + styles.blue} to="/todos">
                        Todos
                    </RouteLink>
                    <RouteLink className={styles.button + ' ' + styles.orange} to="/loadable">
                        Loadable
                    </RouteLink>
                    <RouteLink className={styles.button + ' ' + styles.green} to="/sierpinski">
                        Sierpinski
                    </RouteLink>
                </Div>
            </Div>
        </Div>
    )
}

render(<App />)
