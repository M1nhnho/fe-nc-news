import { useEffect, useState } from "react";

export function useInfiniteScroll(getMore)
{
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    function handleScroll()
    {
        window.innerHeight + window.scrollY >= document.body.offsetHeight
            && !isLoadingMore
            && setIsLoadingMore(true);
    }

    useEffect(() =>
    {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() =>
    {
        isLoadingMore && getMore();
    }, [isLoadingMore]);

    return [isLoadingMore, setIsLoadingMore];
}