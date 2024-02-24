/* eslint-disable */
import React from "react";
import Skeleton from "../Skeleton";
import LazyImage from "../LazyImage";
import useView from "../../hooks/view";
import { Icon } from '@iconify/react';
import { Profile } from "../../interfaces/config";
import { IntersectionView } from "../../interfaces/page";
import { Typewriter } from "react-simple-typewriter";

export default function ProfileCard({ profile, loading }: {
    profile: Profile
    loading: boolean
    intersection?: IntersectionView
}) {
    const [ref, visibility] = useView();

    return (
        <div ref={ref} className={`${visibility ? `animate-fade-down animate-duration-[2000ms] opacity-100` : 'opacity-0'} card shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800`}>
            <div className="grid place-items-center py-8">
                {loading ? (
                    <>
                        <div className="avatar opcaity-90 mb-8">
                            <Skeleton width="w-32" height="h-32" shape="rounded-full" />
                        </div>
                        <div className="text-center mx-auto px-8">
                            <Skeleton width="w-64" height="h-8" />
                            <div className="mt-3 text-base-content text-opacity-60 font-mono">
                                <Skeleton width="w-64" height="h-5" />
                            </div>
                        </div>
                        <div className="mt-6">
                            <Skeleton width="w-32" height="h-8" />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="avatar opcaity-90 mb-8">
                            <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-gray-100 dark:ring-offset-gray-500 ring-offset-2">
                                <LazyImage
                                    src={profile.avatar}
                                    alt={profile.name}
                                    placeholder={<Skeleton width="w-32" height="h-32" shape="rounded-full" />}
                                    className="w-full h-full rounded-full object-cover -object-[59%_-4px]"
                                />
                            </div>
                        </div>
                        <div className="text-center mx-auto px-8">
                            <h5 className="font-bold text-3xl dark:text-white">
                                <span className="text-base-content opacity-70">
                                    {profile.name}
                                </span>
                            </h5>
                            {
                                profile.bio && (
                                    <div className="mt-3">
                                        <span className="dark:text-white text-opacity-60 font-serif -italic">
                                            <Typewriter
                                                loop
                                                cursor
                                                cursorStyle='_'
                                                typeSpeed={100}
                                                deleteSpeed={0}
                                                delaySpeed={3000}
                                                words={Array.isArray(profile.bio) ? profile.bio : profile.bio.split('')}
                                            />
                                        </span>
                                    </div>
                                )
                            }
                        </div>
                        {
                            profile.resume && (
                                <div className="mt-6">
                                    <a
                                        download
                                        target="_blank"
                                        rel="noreferrer"
                                        href={profile.resume}
                                        className="flex items-center gap-1 rounded-md border border-gray-900 dark:border-gray-500 py-2 px-4 text-center text-xs align-middle font-sans -uppercase text-gray-900 dark:text-white transition-all hover:opacity-75 focus:ring "
                                    >
                                        <Icon icon="mdi:download" />
                                        Resume
                                    </a>
                                </div>
                            )
                        }
                    </>
                )}
            </div>
        </div >
    )
}