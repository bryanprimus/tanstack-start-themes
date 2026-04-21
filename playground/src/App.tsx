import { ThemeProvider, useTheme } from '../../src'

function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()

  return (
    <div>
      <p>Active Theme: {theme}</p>
      <p>Resolved Theme: {resolvedTheme}</p>
      <button onClick={() => setTheme('light')}>Light</button>
      <button onClick={() => setTheme('dark')}>Dark</button>
      <button onClick={() => setTheme('auto')}>Auto</button>
    </div>
  )
}

export function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
    </ThemeProvider>
  )
}