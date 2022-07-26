import { Div } from './theme_toggle.scss'

interface ThemeToggleProps {
    value: 'dark' | 'light'
    onChange: (v: 'dark' | 'light') => void
}

export function ThemeToggle(props: ThemeToggleProps) {
    const { value, onChange } = props
    const isDark = value === 'dark'
    const isLight = value === 'light'
    const handleClick = () => onChange(isDark ? 'light' : 'dark')

    return (
        <Div css:container css:dark={isDark} css:light={isLight} onClick={handleClick}>
            <Div css:label>Dark</Div>
            <Div css:toggle>
                <Div css:slider>
                    <Div css:moon />
                    <Div css:sun />
                </Div>
            </Div>
            <Div css:label>Light</Div>
        </Div>
    )
}
