import { Div } from './menu.scss'
import { Api } from 'loadable/api'
import { Item, ItemLoader } from './item'
import { Context } from '@whatsup/jsx'

export function* Menu(this: Context) {
    const ids = this.defer(() => Api.loadMenuIds())

    yield <MenuLoader />

    while (true) {
        yield (
            <Div container>
                {ids.value!.map((id) => (
                    <Item id={id} key={id} />
                ))}
            </Div>
        )
    }
}

function MenuLoader() {
    return (
        <Div container>
            <ItemLoader />
            <ItemLoader />
            <ItemLoader />
            <ItemLoader />
            <ItemLoader />
            <ItemLoader />
        </Div>
    )
}
