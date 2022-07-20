import styles, { Div } from './ITEM.scss'
import { Loader } from 'loadable/loader'
import { Api } from 'loadable/api'
import { Icons } from './icons'
import { Context } from '@whatsup/jsx'

interface ItemProps {
    id: number
}

export function* Item(this: Context, props: ItemProps) {
    const { id } = props
    const Icon = Icons[id]
    const data = this.defer(() => Api.loadMenuItem(id))

    yield <ItemLoader key={id} />

    const { name } = data.value!

    while (true) {
        yield (
            <Div container key={id}>
                <Div icon>
                    <Icon />
                </Div>
                <Div name>{name!}</Div>
            </Div>
        )
    }
}

export function ItemLoader() {
    return (
        <Div container>
            <Div icon>
                <IconLoader />
            </Div>
            <Div name>
                <Loader h={16} w="50%" />
            </Div>
        </Div>
    )
}

function IconLoader() {
    return <Loader w={26} h={26} r="50%" className={styles.iconLoader} />
}
