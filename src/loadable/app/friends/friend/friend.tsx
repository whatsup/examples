import { Context } from 'whatsup/jsx'
import styles, { Div, Img } from './friend.scss'
import { Loader } from 'loadable/loader'
import { Api } from 'loadable/api'
import { cssx } from 'whatsup/cssx'

const LoaderX = cssx(Loader, styles)

interface FriendProps {
    id: number
}

export function* Friend(this: Context, props: FriendProps) {
    const { id } = props
    const data = this.defer(() => Api.loadFriend(id))

    yield <FriendLoader />

    const { avatar, name, job } = data.value!

    while (true) {
        yield (
            <Div css:container>
                <Img css:avatar src={avatar} />
                <Div css:name>{name}</Div>
                <Div css:job>{job}</Div>
            </Div>
        )
    }
}

export function FriendLoader() {
    return (
        <Div css:container>
            <FriendAvatarLoader />
            <Div css:name>
                <Loader h={16} />
            </Div>
            <Div css:job>
                <Loader h={10} w="40%" />
            </Div>
        </Div>
    )
}

function FriendAvatarLoader() {
    return <LoaderX css:avatarLoader r="50%" w="auto" h="auto" />
}
