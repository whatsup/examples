import { Context } from 'whatsup/jsx'
import styles, { Div, Img } from './friend.scss'
import { Loader } from 'loadable/loader'
import { Api } from 'loadable/api'

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
            <Div container>
                <Img avatar src={avatar} />
                <Div name>{name}</Div>
                <Div job>{job}</Div>
            </Div>
        )
    }
}

export function FriendLoader() {
    return (
        <Div container>
            <FriendAvatarLoader />
            <Div name>
                <Loader h={16} />
            </Div>
            <Div job>
                <Loader h={10} w="40%" />
            </Div>
        </Div>
    )
}

function FriendAvatarLoader() {
    return <Loader r="50%" w="auto" h="auto" className={styles.avatarLoader} />
}
