/* eslint-disable */
import React from "react";
import Skeleton from "../Skeleton";
import { Icon, IconifyIcon } from "@iconify/react";
import { Information } from "../../interfaces/config";
import useView from "../../hooks/view";
import { IntersectionView } from "../../interfaces/page";

function ListItem(props: {
    icon: string | IconifyIcon
    title: React.ReactNode
    value: React.ReactNode
    link?: string
    loading: boolean
}) {
    return (
        <div className="flex justify-between py-2 px-3 items-center">
            <div className="flex-grow font-medium gap-2 flex items-center my-1">
                {
                    props.loading ? (
                        <>
                            <Skeleton width="w-4" height="h-4" shape="rounded-full" />
                            <Skeleton width="w-24" height="h-4" shape="rounded-md" />
                        </>
                    ) : (
                        <>
                            <Icon icon={props.icon} />
                            {props.title}
                        </>
                    )
                }
            </div>
            <a
                target="_blank"
                rel="noreferrer"
                href={props.link}
                style={{ wordBreak: 'break-word' }}
                className={`text-sm font-normal mr-2 ml-3 ${props.link ? 'truncate hover:text-blue-600 dark:hover:text-cyan-400' : ''}`}
            >
                {
                    props.loading ? <Skeleton width="w-56" height="h-4" /> : props.value
                }
            </a>
            {/* {props.link && <Icon icon="mdi:link-variant" />} */}
        </div>
    )
}

export default function InfoCard(props: {
    loading: boolean,
    info: Information[]
    intersection?: IntersectionView
}) {
    const [ref, visibility] = useView(props.intersection);

    return (
        <div ref={ref} className={`${visibility ? `animate-fade-right animate-duration-[2000ms] opacity-100` : 'opacity-0'} card shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800`}>
            <div className="card-body">
                <div className="dark:text-white opacity-60">
                    {
                        <React.Fragment>
                            {props.info && props.info.map((info, key) => (
                                <ListItem
                                    key={key}
                                    icon={info.icon}
                                    title={info.title}
                                    value={info.value}
                                    link={info.link}
                                    loading={props.loading}
                                />
                            ))}
                        </React.Fragment>
                    }
                </div>
            </div>
        </div>
    )
}