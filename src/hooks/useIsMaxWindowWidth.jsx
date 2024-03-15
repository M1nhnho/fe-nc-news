import { useEffect, useState } from "react";

export function useIsMaxWindowWidth()
{
    const [isMaxWindowWidth, setIsMaxWindowWidth] = useState(window.innerWidth >= 1000);

    useEffect(() =>
    {
        function handleResize()
        {
            setIsMaxWindowWidth(window.innerWidth >= 1000);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return isMaxWindowWidth;
}