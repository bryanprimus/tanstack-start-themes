# tanstack-start-themes

An abstraction for themes in your Tanstack app.

## Install

```bash
npm install tanstack-start-themes
# or
bun install tanstack-start-themes
```

## Usage

go to `src/routes/__root.tsx`

set `suppressHydrationWarning` to html tag 

```tsx
<html suppressHydrationWarning>{...}</html>
```

import `THEME_INIT_SCRIPT` and put it inside `<head>` tag

```tsx
import { THEME_INIT_SCRIPT } from 'tanstack-start-themes'

<head>
  <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
</head>
```

import and wrap your app inside `ThemeProvider`

```tsx
import { ThemeProvider } from 'tanstack-start-themes'

<body>
  <ThemeProvider>{children}</ThemeProvider>  
</body>
```

use `useTheme` hook to update and get value of active and resolved `theme`

```tsx
const { theme, setTheme, resolvedTheme } = useTheme()
```

## Development

- Install dependencies:

```bash
npm install
```

- Run the playground:

```bash
npm run play
```

- Run the unit tests:

```bash
npm run test
```

- Build the library:

```bash
npm run build
```
