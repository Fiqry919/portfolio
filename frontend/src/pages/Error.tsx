/* eslint-disable */
import React from "react";
import useHead from "../hooks/head";
import * as Router from 'react-router-dom';
import { ErrorPage } from "../interfaces/page";
import useTheme from "../hooks/theme";

export default function Error(props: Partial<ErrorPage>) {
    const [theme] = useTheme();
    const location = Router.useLocation();
    const navigate = Router.useNavigate();

    const [code, setCode] = React.useState(props.code || 404);
    const [title, setTitle] = React.useState(props.title || 'Not Found');
    const [message, setMessage] = React.useState(props.message || "");
    const [previous, setPrevious] = React.useState(-1);

    useHead({ title });

    React.useEffect(() => {
        if (location.state) {
            setCode(location.state.code);
            setTitle(location.state.title);
            setMessage(location.state.message);
            setPrevious(location.state.previous);
        }
    }, []);

    function handleBack(event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) {
        event.preventDefault();
        navigate(previous);
    }

    return (
        <div className="flex justify-center items-center min-w-screen min-h-screen p-5 lg:p-20 overflow-hidden relative dark:bg-gray-900">
            <div className="flex min-w-full min-h-full rounded-3xl bg-base-100 shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left dark:bg-gray-800">
                <div className="w-full text-center fade-in">
                    <div className="mb-10 md:mb-20 mt-10 md:mt-20 text-gray-600 dark:text-gray-300 font-light space-y-3">
                        <h1 className="font-black uppercase text-3xl lg:text-5xl text-primary mb-10">
                            {`${code}`}
                        </h1>
                        <p className="font-bold text-2xl pb-2 text-base-content">{title}</p>
                        <div className="text-base-content text-opacity-60">
                            {message || "The page you are looking for might have been removed had its name changed or is temporarily unavailable."}
                        </div>
                        {
                            props.previous && (
                                <p className='btn-back px-5 py-2 cursor-pointer hover:opacity-60' onClick={handleBack}>back</p>
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="w-64 md:w-96 h-96 md:h-full bg-accent bg-opacity-10 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
            <div className="w-96 h-full bg-secondary bg-opacity-10 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
        </div>
    )
}