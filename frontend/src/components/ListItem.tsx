import { Icon } from "@iconify/react"
import React from "react"

export default function ListItem({ time, title, value, link }: {
    time: React.ReactNode
    title?: React.ReactNode
    value?: React.ReactNode
    link?: string | React.ReactNode
}) {
    return (
        <li className="mb-5 ml-4 gap-1">
            <div className="absolute w-2 h-2 bg-gray-500 rounded-full border border-gray-500 mt-1.5" style={{ left: '-4.5px' }} />
            <div className="my-0.5 text-xs tracking-wide">{time}</div>
            <h3 className="font-semibold">{title}</h3>
            <div className="flex mb-4 font-normal items-center gap-2">
                {
                    link && typeof link === 'string' ? (
                        <>
                            <Icon icon="mdi:link-variant" />
                            <a href={link} target="_blank" rel="noreferrer" className="hover:text-blue-500">
                                {value}
                            </a>
                        </>
                    ) : value
                }
            </div>
        </li>
    )
}