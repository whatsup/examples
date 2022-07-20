/// <reference path="./@types/index.d.ts" />

import './reset.css'
import { Route } from 'whatsup/route'
import { render } from 'whatsup/jsx'
import { App as Todos } from './todos'
import { App as Sierpinski } from './sierpinski'
import { App as Loadable } from './loadable'

function App() {
    return (
        <>
            <Route path="/todos" component={Todos} />
            <Route path="/sierpinski" component={Sierpinski} />
            <Route path="/loadable" component={Loadable} />
        </>
    )
}

render(<App />)
