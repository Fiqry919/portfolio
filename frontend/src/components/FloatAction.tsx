/* eslint-disable */
import React from "react";
import { Icon } from "@iconify/react";
import { SetTheme } from "../interfaces/page";

interface Props {
    theme?: string,
    setTheme: SetTheme
}

export default function FloatAction({ props }: { props: Props }) {
    function change() {
        props.setTheme(props.theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div className="fixed bottom-5 right-5 z-50">
            <div className="flex flex-col items-center space-y-2">
                <button
                    type="button"
                    onClick={change}
                    className="middle none relative h-10 max-h-[40px] w-10 max-w-[40px] rounded-full bg-blue-500 hover:opacity-80 text-center font-sans text-xs font-medium uppercase text-white shadow-md transition-all hover:shadow-lg active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                    <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform">
                        <Icon icon={`mdi:${props.theme === 'dark' ? 'white-balance-sunny' : 'weather-night'}`} width={20} height={20} />
                    </span>
                </button>
            </div>
        </div>
    )
}