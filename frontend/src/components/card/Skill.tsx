/* eslint-disable */
import React from "react";
import { IntersectionView } from "../../interfaces/page";
import ReactDOM from 'react-dom';
import useView from "../../hooks/view";
import Skeleton from "../Skeleton";

export default function SkillCard({ loading, intersection, skills }: {
    loading: boolean,
    intersection?: IntersectionView
    skills: string[]
}) {
    const [ref, visibility] = useView(intersection);

    function renderAnimation(skill: string, key: number) {
        const delay = key === 0 ? 1000 : 1000 + (key * 150);
        setTimeout(() => {
            if (!loading) {
                ReactDOM.render(
                    <div key={key} className="animate-fade-left animate-ease-linear m-1 text-xs rounded-full px-3 py-1 bg-blue-500 dark:text-white p-2 font-bold leading-sm flex items-center bg-opacity-90">
                        {skill}
                    </div>,
                    document.getElementById(`skill-${key}`)
                );
            }
        }, delay);
        return loading ? <Skeleton key={key} className="m-1 w-16 h-6" /> : <div key={key} id={`skill-${key}`} />;
    }

    return (
        <div ref={ref} className={`${visibility ? `animate-fade-right animate-duration-[2000ms] opacity-100` : 'opacity-0'} card shadow-lg rounded-lg bg-gray-100 dark:bg-gray-800`}>
            <div className="card-body">
                <div className="flex flex-col m-3 gap-3">
                    <h5 className="text-xl font-bold italic font-serif">
                        {loading ? (
                            <Skeleton width="w-44" height="h-6" />
                        ) : (
                            <span className="dark:text-white capitalize opacity-70">Tech Stack</span>
                        )}
                    </h5>
                    <div className="p-3 flow-root">
                        <div className="m-1 flex flex-wrap justify-center">
                            {skills.length > 0 && skills.map(renderAnimation)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}