import { action, computed, map, observable } from 'whatsup'

export interface TodoData {
    id: string
    name: string
    done?: boolean
}

export class TodoModel {
    readonly id: string

    @observable
    name: string

    @observable
    done: boolean

    constructor({ id, name, done = false }: TodoData) {
        this.id = id
        this.name = name
        this.done = done
    }
}

export class Store {
    readonly data = map<string, TodoModel>()

    @computed
    get todos() {
        return [...this.data.values()]
    }

    @computed
    get hasCompleted() {
        return this.todos.length - this.activeCount > 0
    }

    @computed
    get activeCount() {
        return this.todos.filter((todo) => !todo.done).length
    }

    get(id: string) {
        return this.data.get(id)
    }

    @action
    create(name: string) {
        const id = (~~(Math.random() * 1e8)).toString(16)
        const todo = new TodoModel({ id, name })

        this.data.set(id, todo)
    }

    @action
    remove(id: string) {
        this.data.delete(id)
    }

    @action
    removeCompleted() {
        for (const todo of this.todos) {
            if (todo.done) {
                this.remove(todo.id)
            }
        }
    }
}
