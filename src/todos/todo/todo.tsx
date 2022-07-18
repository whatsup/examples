import { observable } from 'whatsup'
import { Context, createRef, Event } from 'whatsup/jsx'
import { Store, TodoModel } from '../store'
import { Li, Span, Button, Input } from './todo.scss'
import { ENTER_KEY, ESCAPE_KEY } from '../constants'
import CheckboxOnIcon from './icons/checkbox-on.svg'
import CheckboxOffIcon from './icons/checkbox-off.svg'
import RemoveIcon from './icons/remove.svg'

class NeedDisableEditEvent extends Event {}
class NameChangeEvent extends Event {
    constructor(readonly value: string) {
        super()
    }
}

interface TodoProps {
    id: string
}

export function* Todo(this: Context, props: TodoProps) {
    const { id } = props
    const store = this.find(Store)
    const todo = store.get(id)!
    const edit = observable(false)
    const handleDoneToggle = () => (todo.done = !todo.done)
    const handleEdit = () => edit(true)
    const handleRemove = () => store.remove(id)

    this.share(todo)
    this.on(NeedDisableEditEvent, () => edit(false))
    this.on(NameChangeEvent, (e) => (todo.name = e.value))

    while (true) {
        const { name, done } = todo

        yield (
            <Li container key={id}>
                <Button status done={done} onClick={handleDoneToggle}>
                    <img src={done ? CheckboxOnIcon : CheckboxOffIcon} />
                </Button>
                {edit() ? (
                    <NameEditor />
                ) : (
                    <Span todoName done={done} onDblClick={handleEdit}>
                        {name}
                    </Span>
                )}
                <Button remove onClick={handleRemove}>
                    <img src={RemoveIcon} />
                </Button>
            </Li>
        )
    }
}

function* NameEditor(this: Context) {
    const todo = this.find(TodoModel)
    const value = observable(todo.name)
    const ref = createRef()
    const outsideClickHandler = (e: any) => {
        if (!ref.current.contains(e.target)) {
            this.dispatch(new NeedDisableEditEvent())
        }
    }
    const handleEditInputChange = (e: any) => {
        value(e.target.value)
    }
    const handleEditInputKeyDown = (e: any) => {
        if (e.keyCode === ENTER_KEY) {
            this.dispatch(new NameChangeEvent(value()))
            this.dispatch(new NeedDisableEditEvent())
        }
        if (e.keyCode === ESCAPE_KEY) {
            this.dispatch(new NeedDisableEditEvent())
        }
    }

    document.addEventListener('click', outsideClickHandler)

    try {
        while (true) {
            yield (
                <Input
                    editName
                    ref={ref}
                    value={value()}
                    onMount={(e) => (e as HTMLInputElement).focus()}
                    onInput={handleEditInputChange}
                    onKeyDown={handleEditInputKeyDown}
                />
            )
        }
    } finally {
        document.removeEventListener('click', outsideClickHandler)
    }
}
