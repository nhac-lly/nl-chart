import React from "react";

export const useFetch = (url: string) => {
    const [data, setData] = React.useState<any>(undefined);
    const [errors, setErrors] = React.useState<any>(undefined);
    const [fetching, setFetching] = React.useState<any>(true);
    React.useEffect(() => {
        const controller = new AbortController;
        const signal = controller.signal
        fetch(url, { signal })
            .then(res => res.json())
            .then(data => { setData(data), setFetching(false) })
            .catch(err => {
                if (err.name === "AbortError") setErrors(err.message)
            }
            )
        return () => {
            controller.abort()
        }
    }, [])
    return { data, errors, fetching }
}