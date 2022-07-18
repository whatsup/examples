import { Context } from 'whatsup/jsx'
import { Store } from '../store'
import { Filter } from '../constants'
import { FILTER } from '../keys'
import { Div, Span, A, Ul, Li } from './footer.scss'

export function* Footer(this: Context) {
    const store = this.find(Store)
    const filter = this.find(FILTER)

    while (true) {
        const { activeCount, hasCompleted } = store
        const handleClearCompleted = () => store.removeCompleted()

        yield (
            <Div container>
                <Div flex>
                    <Span left visible={!!activeCount}>
                        {activeCount} items left
                    </Span>
                    <Ul filters>
                        <Li
                            filter
                            active={filter() === Filter.All}
                            onClick={() => filter(Filter.All)}
                        >
                            All
                        </Li>
                        <Li
                            filter
                            active={filter() === Filter.Active}
                            onClick={() => filter(Filter.Active)}
                        >
                            Active
                        </Li>
                        <Li
                            filter
                            active={filter() === Filter.Completed}
                            onClick={() => filter(Filter.Completed)}
                        >
                            Completed
                        </Li>
                    </Ul>
                    <A
                        clear
                        onClick={handleClearCompleted}
                        visible={hasCompleted}
                    >
                        Clear completed
                    </A>
                </Div>
                <Div help>Double click to edit a todo</Div>
            </Div>
        )
    }
}
