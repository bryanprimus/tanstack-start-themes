import React, { createContext, useMemo, useCallback, useState, useEffect } from 'react';
import { ThemeHotkey } from './theme-hot-key';

type ThemeMode = 'light' | 'dark' | 'auto';

export type ThemeContextValue = {
	theme: ThemeMode;
	setTheme: (mode: ThemeMode) => void;
	resolvedTheme: 'light' | 'dark';
};

export const ThemeContext: React.Context<ThemeContextValue | undefined> = createContext<
	ThemeContextValue | undefined
>(undefined);

function getInitialMode(): ThemeMode {
	if (typeof window === 'undefined') return 'auto';
	const stored = window.localStorage.getItem('theme');
	if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored;
	return 'auto';
}

function getResolvedTheme(mode: ThemeMode): 'light' | 'dark' {
	if (mode !== 'auto') return mode;
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyThemeMode(mode: ThemeMode) {
	const resolved = getResolvedTheme(mode);
	document.documentElement.classList.remove('light', 'dark');
	document.documentElement.classList.add(resolved);
	if (mode === 'auto') {
		document.documentElement.removeAttribute('data-theme');
	} else {
		document.documentElement.setAttribute('data-theme', mode);
	}
	document.documentElement.style.colorScheme = resolved;
}

export type ThemeProviderProps = {
	children: React.ReactNode;
	/**
	 * Enables the 'd' hotkey to toggle between light and dark themes.
	 * @default false
	 */
	enableHotkey?: boolean;
}

export function ThemeProvider({ children, enableHotkey = false }: ThemeProviderProps): React.ReactNode {
	const [theme, setThemeState] = useState<ThemeMode>('auto');
	const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

	useEffect(() => {
		const initial = getInitialMode();
		setThemeState(initial);
		applyThemeMode(initial);
		setResolvedTheme(getResolvedTheme(initial));
	}, []);

	useEffect(() => {
		if (theme !== 'auto') return;
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onChange = () => {
			applyThemeMode('auto');
			setResolvedTheme(getResolvedTheme('auto'));
		};
		media.addEventListener('change', onChange);
		return () => media.removeEventListener('change', onChange);
	}, [theme]);

	const setTheme = useCallback((mode: ThemeMode) => {
		setThemeState(mode);
		applyThemeMode(mode);
		setResolvedTheme(getResolvedTheme(mode));
		window.localStorage.setItem('theme', mode);
	}, []);

	const value = useMemo(
		() => ({ theme, setTheme, resolvedTheme }),
		[theme, setTheme, resolvedTheme],
	);

	return <ThemeContext.Provider value={value}>{enableHotkey && <ThemeHotkey/>}{children}</ThemeContext.Provider>;
}
