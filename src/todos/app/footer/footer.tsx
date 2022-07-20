import { Context } from 'whatsup/jsx'
import { Store } from 'todos/store'
import { Filter } from 'todos/constants'
import { FILTER } from 'todos/keys'
import { Div } from './footer.scss'

export function* Footer(this: Context) {
    const store = this.find(Store)
    const filter = this.find(FILTER)

    while (true) {
        const { activeCount, hasCompleted } = store
        const handleClearCompleted = () => store.removeCompleted()

        yield (
            <Div container>
                <Div flex>
                    <Div activeCount visible={!!activeCount}>
                        {activeCount} items left
                    </Div>
                    <Div filters>
                        <Div filter active={filter() === Filter.All} onClick={() => filter(Filter.All)}>
                            All
                        </Div>
                        <Div filter active={filter() === Filter.Active} onClick={() => filter(Filter.Active)}>
                            Active
                        </Div>
                        <Div filter active={filter() === Filter.Completed} onClick={() => filter(Filter.Completed)}>
                            Completed
                        </Div>
                    </Div>
                    <Div clear onClick={handleClearCompleted} visible={hasCompleted}>
                        Clear completed
                    </Div>
                </Div>
                <Div help>Double click to edit a todo</Div>
            </Div>
        )
    }
}
