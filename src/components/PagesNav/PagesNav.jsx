import './PagesNav.css';

export default function PagesNav({ totalCount, isMaxWindowWidth, setPage })
{
    return (
        <nav className="pages-nav">
        {
            Array
                .from(
                    {length: Math.ceil(totalCount / (isMaxWindowWidth ? 12 : 10))},
                    (value, index) => index + 1
                )
                .map((page) =>
                {
                    return <button aria-label="View page" key={page} onClick={() => setPage(page)}>{page}</button>
                })
        }
        </nav>
    )
}