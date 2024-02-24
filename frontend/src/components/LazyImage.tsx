/* eslint-disable */
import React from "react";

interface LazyImage extends React.ImgHTMLAttributes<HTMLImageElement> {
    placeholder?: React.ReactElement
}

export default function LazyImage({ placeholder, ...props }: LazyImage) {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (props.src) {
            const image = new Image();
            image.src = props.src;
            image.onload = () => setLoading(false);
        }
    }, [props.src]);

    return (
        <React.Fragment>
            {loading ? placeholder : <img {...props} />}
        </React.Fragment>
    )
}