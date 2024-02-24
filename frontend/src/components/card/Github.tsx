import React from "react";
import { GithubProject, IntersectionView } from "../../interfaces/page";
import useView from "../../hooks/view";
import Skeleton from "../Skeleton";
import { Icon } from "@iconify/react";
import Colors from '../../assets/color.json';

function Project({ transition, loading, intersection, project }: {
    transition: string
    loading: boolean
    intersection?: IntersectionView
    project: GithubProject
}) {
    const [ref, visibility] = useView(intersection);

    return (
        <a ref={ref} href={project.html_url} target="_blank" rel="noreferrer" className={`${visibility ? `${transition} animate-duration-[1000ms] animate-delay-500 opacity-100` : 'opacity-0'} card rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg cursor-pointer`}>
            <div className="flex justify-between flex-col p-5 h-full w-full">
                <div className="flex flex-col">
                    <div className="flex items-center text-lg tracking-wide dark:text-white opacity-60 gap-2">
                        {
                            loading ? <Skeleton className="w-32 h-6 mb-1" /> : (
                                <>
                                    <Icon icon="mdi:link" />
                                    <span>{project.name}</span>
                                </>
                            )
                        }
                    </div>
                    <p className="mb-5 mt-1 dark:text-white text-opacity-60 text-sm font-thin">
                        {
                            loading ? <Skeleton className="w-full h-4 rounded-md" /> : project.description
                        }
                    </p>
                </div>
                <div className="flex justify-between text-sm text-gray-700 dark:text-gray-200 text-opacity-60 truncate">
                    <div className="flex flex-grow">
                        <span className="mr-3 flex items-center">
                            {
                                loading ? <Skeleton className="w-8 h-4" /> : (
                                    <>
                                        <Icon icon="mdi:star-outline" />
                                        <span>{project.stargazers_count}</span>
                                    </>
                                )
                            }
                        </span>
                        <span className="flex items-center">
                            {
                                loading ? <Skeleton className="w-8 h-4" /> : (
                                    <>
                                        <Icon icon="ph:git-fork" />
                                        <span>{project.forks_count}</span>
                                    </>
                                )
                            }
                        </span>
                    </div>
                    <div>
                        <span className="flex items-center">
                            {
                                loading ? <Skeleton className="w-24 h-4" /> : (
                                    <>
                                        <div
                                            className="w-3 h-3 rounded-full mr-1 opacity-60"
                                            style={{ backgroundColor: (Colors as any)[project.language]?.color || 'gray' }}
                                        />
                                        <span>{project.language || 'Unknown'}</span>
                                    </>
                                )
                            }
                        </span>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default function GithubCard({ title, username, loading, projects, intersection }: {
    title: string
    loading: boolean
    intersection?: IntersectionView
    username?: string
    projects: GithubProject[]
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
                                    {loading ? <Skeleton width="w-10" height="h-5" />
                                        : (
                                            <a target="_blank" rel="noreferrer" href={`https://github.com/${username}?tab=repositories`} className="m-3 text-xs dark:text-white opacity-50 hover:underline">
                                                See All
                                            </a>
                                        )
                                    }
                                </div>
                                <div className="col-span-2 px-5 pb-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {projects.map((project, key) => (
                                            <Project key={key} transition={key % 2 === 0 ? 'animate-fade-right' : 'animate-fade-left'} loading={loading} intersection={intersection} project={project} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}