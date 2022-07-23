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
            <Div css:container>
                <Div css:flex>
                    <Div css:activeCount css:visible={!!activeCount}>
                        {activeCount} items left
                    </Div>
                    <Div css:filters>
                        <Div css:filter css:active={filter() === Filter.All} onClick={() => filter(Filter.All)}>
                            All
                        </Div>
                        <Div css:filter css:active={filter() === Filter.Active} onClick={() => filter(Filter.Active)}>
                            Active
                        </Div>
                        <Div
                            css:filter
                            css:active={filter() === Filter.Completed}
                            onClick={() => filter(Filter.Completed)}
                        >
                            Completed
                        </Div>
                    </Div>
                    <Div css:clear onClick={handleClearCompleted} css:visible={hasCompleted}>
                        Clear completed
                    </Div>
                </Div>
                <Div css:help>Double click to edit a todo</Div>
            </Div>
        )
    }
}
