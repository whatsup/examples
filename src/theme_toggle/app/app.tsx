import { ThemeToggle } from './theme_toggle'
import { Div } from './app.scss'
import { observable } from 'whatsup'

export function* App() {
    const theme = observable<'light' | 'dark'>('light')
    const handleChange = (v: 'light' | 'dark') => theme(v)

    while (true) {
        const isDark = theme() === 'dark'
        const isLight = theme() === 'light'

        yield (
            <Div css:container css:dark={isDark} css:light={isLight}>
                <ThemeToggle value={theme()} onChange={handleChange} />
            </Div>
        )
    }
}
