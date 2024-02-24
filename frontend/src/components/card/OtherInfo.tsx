/* eslint-disable */
import React from "react";
import { OtherInformation } from "../../interfaces/config";
import useView from "../../hooks/view";
import Skeleton from "../Skeleton";
import { IntersectionView } from "../../interfaces/page";
import ListItem from "../ListItem";

export default function OtherInfoCard({ loading, title, intersection, data }: {
    loading: boolean
    title: string
    intersection?: IntersectionView
    data: OtherInformation[]
}) {
    const [ref, visibility] = useView(intersection);

    return (
        <div ref={ref} className={`${visibility ? `animate-fade-right animate-duration-[2000ms] opacity-100` : 'opacity-0'} card shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800`}>
            <div className="flex flex-col m-3 gap-3">
                <h5 className="text-xl font-bold italic font-serif">
                    {loading ? (
                        <Skeleton width="w-44" height="h-6" />
                    ) : (
                        <span className="dark:text-white capitalize opacity-70">{title}</span>
                    )}
                </h5>
                <div className="dark:text-white opacity-60">
                    <ol className="relative border-l border-gray-500 border-opacity-30">
                        <React.Fragment>
                            {data.map((object, key) => (
                                <ListItem
                                    key={key}
                                    time={loading ? <Skeleton className="w-5/12 h-4" /> : `${object.to ? `${object.from} - ${object.to}` : object.from}`}
                                    title={loading ? <Skeleton className="w-6/12 h-3 my-1.5" /> : object.title}
                                    value={loading ? <Skeleton className="w-6/12 h-4 my-1" /> : object.value}
                                    link={loading ? <Skeleton className="w-6/12 h-4 my-1" /> : object.link}
                                />
                            ))}
                        </React.Fragment>
                    </ol>
                </div>
            </div>
        </div>
    )
}