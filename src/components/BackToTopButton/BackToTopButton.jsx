import './BackToTopButton.css';

export default function BackToTopButton()
{
    function scrollBackToTop()
    {
        window.scrollTo(0, 0);
    }
    
    return (
        <button className="button--blue text-button" onClick={scrollBackToTop}>Back to top</button>
    )
}