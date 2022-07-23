import styles, { Div } from './ITEM.scss'
import { Loader } from 'loadable/loader'
import { Api } from 'loadable/api'
import { Icons } from './icons'
import { Context } from '@whatsup/jsx'
import { cssx } from 'whatsup/cssx'

const LoaderX = cssx(Loader, styles)

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
            <Div css:container key={id}>
                <Div css:icon>
                    <Icon />
                </Div>
                <Div css:name>{name!}</Div>
            </Div>
        )
    }
}

export function ItemLoader() {
    return (
        <Div css:container>
            <Div css:icon>
                <IconLoader />
            </Div>
            <Div css:name>
                <Loader h={16} w="50%" />
            </Div>
        </Div>
    )
}

function IconLoader() {
    return <LoaderX css:iconLoader w={26} h={26} r="50%" />
}
