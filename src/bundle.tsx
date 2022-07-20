/// <reference path="./@types/index.d.ts" />

import './reset.css'
//import { Route } from 'whatsup/route'
import { render } from 'whatsup/jsx'
import { App as Todos } from 'todos/app'

// function App() {
//     return (
//         <>
//             <Route path="/todos" component={Todos} />
//         </>
//     )
// }

render(<Todos />)
