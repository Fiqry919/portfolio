/* eslint-disable */
import React from "react";
import Utils from "../utils";

export default function useHead(params?: {
    title?: string
    description?: string
}) {
    const utils = new Utils();
    const description = params?.description || utils.env('desc');
    // const theme = localStorage.getItem('theme')
    React.useEffect(() => {
        document.title = params?.title || utils.env('title');
        document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }, []);
}