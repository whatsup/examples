import { Div } from './groups.scss'
import { Api } from 'loadable/api'
import { Group, GroupLoader } from './group'
import { Context } from '@whatsup/jsx'

export function* Groups(this: Context) {
    const ids = this.defer(() => Api.loadGroupIds())

    yield <GroupsLoader />

    while (true) {
        yield (
            <Div css:container>
                {ids.value!.map((id) => (
                    <Group id={id} />
                ))}
            </Div>
        )
    }
}

function GroupsLoader() {
    return (
        <Div css:container>
            <GroupLoader />
            <GroupLoader />
            <GroupLoader />
            <GroupLoader />
            <GroupLoader />
            <GroupLoader />
        </Div>
    )
}
