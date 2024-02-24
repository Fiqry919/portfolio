/* eslint-disable */
import { RefObject, useEffect, useRef, useState } from "react";
import { IntersectionView } from "../interfaces/page";

export default function useView<T = any>(options?: IntersectionView): [RefObject<T>, boolean] {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    const callback = (entries: IntersectionObserverEntry[]) => {
        const [entry] = entries;
        if (options?.loop || (!visible && entry.isIntersecting)) {
            setVisible(entry.isIntersecting);
        }
    }

    useEffect(() => {
        const observer = new IntersectionObserver(callback, options);

        if (ref.current) {
            observer.observe(ref.current as any);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current as any);
            }
        };
    }, [ref, options]);

    return [ref, visible]
}