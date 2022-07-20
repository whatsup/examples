import { Div } from './friends.scss'
import { Context } from '@whatsup/jsx'
import { Loader } from 'loadable/loader'
import { Api } from 'loadable/api'
import { Friend, FriendLoader } from './friend'

export function* Friends(this: Context) {
    const ids = this.defer(() => Api.loadFriendIds())

    yield <FriendsLoader />

    while (true) {
        yield (
            <Div container>
                <Div header>My friends</Div>
                {ids.value!.map((id) => (
                    <Friend id={id} key={id} />
                ))}
            </Div>
        )
    }
}

function FriendsLoader() {
    return (
        <Div container>
            <Div header>
                <Loader h={26} />
            </Div>
            <FriendLoader />
            <FriendLoader />
            <FriendLoader />
            <FriendLoader />
            <FriendLoader />
            <FriendLoader />
        </Div>
    )
}
