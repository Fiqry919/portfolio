import React from "react"

export default function Skeleton(props: {
    width?: string
    height?: string
    style?: React.CSSProperties
    shape?: string
    className?: string
}) {
    const shape = props.shape || 'rounded-lg';
    const classNames = ['bg-gray-300 dark:bg-gray-700', 'animate-pulse', shape];

    if (props.className) {
        classNames.push(props.className);
    }
    if (props.width) {
        classNames.push(props.width);
    }
    if (props.height) {
        classNames.push(props.height);
    }

    return <div className={classNames.join(' ')} style={props.style} />;
}