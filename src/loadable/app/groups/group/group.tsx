import styles, { Div, Img } from './group.scss'
import { Loader } from 'loadable/loader'
import { Api } from 'loadable/api'
import { Context } from '@whatsup/jsx'
import { cssx } from 'whatsup/cssx'

const CSSXLoader = cssx(Loader, styles)

interface GroupProps {
    id: number
}

export function* Group(this: Context, props: GroupProps) {
    const { id } = props
    const data = this.defer(() => Api.loadGroup(id))

    yield <GroupLoader />

    const { name, image } = data.value!

    while (true) {
        yield (
            <Div container>
                <Img img src={image} />
                <Div name>{name}</Div>
            </Div>
        )
    }
}

export function GroupLoader() {
    return (
        <Div container>
            <GroupImgLoader />
            <Div name>
                <Loader />
            </Div>
        </Div>
    )
}

function GroupImgLoader() {
    return <CSSXLoader imgLoader w="auto" h="auto" />
}
