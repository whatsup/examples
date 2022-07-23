import { action, computed, observable } from 'whatsup'
import { Context, createRef, Event } from 'whatsup/jsx'
import { Filter, ENTER_KEY, ESCAPE_KEY } from 'todos/constants'
import { Footer } from './footer'
import { FILTER } from 'todos/keys'
import { Store, TodoModel } from 'todos/store'
import { Todo } from './todo'
import { Div, Input } from './app.scss'

class CreateEvent extends Event {
    constructor(readonly name: string) {
        super()
    }
}

export function* App(this: Context) {
    const store = new Store()
    const filter = observable(Filter.All)
    const filtered = computed(() => {
        const acc = [] as TodoModel[]

        for (const todo of store.todos) {
            if (
                filter() === Filter.All ||
                (filter() === Filter.Active && !todo.done) ||
                (filter() === Filter.Completed && todo.done)
            ) {
                acc.push(todo)
            }
        }

        return acc
    })

    this.share(store)
    this.share(FILTER, filter)
    this.on(CreateEvent, (e) => store.create(e.name))

    while (true) {
        yield (
            <Div css:container>
                <Div css:wrapper>
                    <Div css:header>todos</Div>
                    <Div css:main>
                        <NewTodoNameInput />
                        <Div css:list>
                            {filtered().map((todo) => (
                                <Todo id={todo.id} key={todo.id} />
                            ))}
                        </Div>
                    </Div>
                    <Footer />
                </Div>
            </Div>
        )
    }
}

function* NewTodoNameInput(this: Context) {
    const ref = createRef()
    const value = observable('')
    const handleEditInputChange = (e: any) => {
        value(e.target.value)
    }
    const handleEditInputKeyDown = action((e: any) => {
        if (e.keyCode === ENTER_KEY) {
            this.dispatch(new CreateEvent(value()))
            value('')
        }
        if (e.keyCode === ESCAPE_KEY) {
            value('')
            ref.current?.blur()
        }
    })

    while (true) {
        yield (
            <Input
                css:newTodoNameInput
                ref={ref}
                value={value()}
                placeholder="What needs to be done?"
                onInput={handleEditInputChange}
                onKeyDown={handleEditInputKeyDown}
            />
        )
    }
}
