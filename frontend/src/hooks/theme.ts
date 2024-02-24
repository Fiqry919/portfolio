/* eslint-disable */
import React from "react";
import { SetTheme } from "../interfaces/page";

export default function useTheme(): [string | undefined, SetTheme] {
    const [state, setState] = React.useState<string>();

    function setTheme(state: string) {
        localStorage.setItem('theme', state);
        setState(state);
    }

    React.useEffect(() => {
        const theme = localStorage.getItem('theme');

        if (!theme) {
            localStorage.setItem('theme', 'light');
        }

        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }

        setState(localStorage.theme);
    }, [state]);

    return [state, setTheme];
}