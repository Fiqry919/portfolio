/* eslint-disable */
import React from "react";
import { IntersectionView } from "../../interfaces/page";
import { ExternalProject } from "../../interfaces/config";
import Skeleton from "../Skeleton";
import useView from "../../hooks/view";
import LazyImage from "../LazyImage";
import Utils from "../../utils";

function Project({ transition, loading, intersection, project }: {
    transition: string
    loading: boolean
    intersection?: IntersectionView
    project: ExternalProject
}) {
    const utils = new Utils();
    const [ref, visibility] = useView(intersection);

    return (
        <a ref={ref} href={project.link} target="_blank" rel="noreferrer" className={`${visibility ? `${transition} animate-duration-[1000ms] animate-delay-500 opacity-100` : 'opacity-0'} card rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg cursor-pointer`}>
            <div className="w-full h-full p-5">
                <div className="flex flex-col items-center text-center px-4">
                    <h2 className="font-semibold text-lg tracking-wide text-center opacity-60 mb-2 dark:text-white">
                        {loading ? <Skeleton className="w-32 h-6 mx-auto" /> : project.title}
                    </h2>
                    {project.image && (
                        <div className="opacity-90 p-2">
                            <div className="w-20 h-20">
                                {loading ? <Skeleton className="w-full h-full rounded-md" /> :
                                    <LazyImage
                                        src={project.image && project.image.search('http') == -1 ? `${utils.env('url')}/${project.image}` : project.image}
                                        alt="thumbnail"
                                        className="w-full h-full object-cover rounded-md"
                                        placeholder={<Skeleton className="w-full h-full" />}
                                    />
                                }
                            </div>
                        </div>
                    )}
                    {
                        loading ? (
                            <div className="mt-2 flex items-center flex-wrap justify-center w-full">
                                <Skeleton className="w-full h-4 mx-auto" />
                            </div>
                        ) : (
                            <p className="mt-1 dark:text-white opacity-60 text-sm">
                                {project.description}
                            </p>
                        )
                    }
                </div>
            </div>
        </a>
    )
}

export default function ExternalProjectCard({ title, loading, intersection, projects }: {
    title: string
    loading: boolean
    intersection?: IntersectionView
    projects: ExternalProject[]
}) {
    const [ref, visibility] = useView(intersection);

    return (
        <React.Fragment>
            <div ref={ref} className={`${visibility ? `animate-fade animate-duration-500 opacity-100` : 'opacity-0'} col-span-1 lg:col-span-2`}>
                <div className="grid grid-cols-2 gap-6">
                    <div className="col-span-2">
                        <div className="card rounded-lg bg-gray-100 dark:bg-gray-800/50 shadow bg-opacity-40">
                            <div className="flex flex-col">
                                <div className="mx-3 flex items-center justify-between mb-2">
                                    <h5 className="text-xl font-bold italic font-serif m-3">
                                        {loading ? (
                                            <Skeleton width="w-40" height="h-6" />
                                        ) : (
                                            <span className="dark:text-white capitalize opacity-70">{title}</span>
                                        )}
                                    </h5>
                                </div>
                                <div className="col-span-2 px-5 pb-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {projects.map((project, key) => (
                                            <Project key={key} transition={key % 2 === 0 ? 'animate-fade-down' : 'animate-fade-up'} loading={loading} intersection={intersection} project={project} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ div>
        </React.Fragment>
    )
}