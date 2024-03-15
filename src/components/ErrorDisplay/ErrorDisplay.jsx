import './ErrorDisplay.css';
import { useNavigate } from 'react-router-dom';

export default function ErrorDisplay({ error })
{
    const navigate = useNavigate();
    const errorSubheadings =
    {
        400: 'Bad request :(',
        404: 'Page not found :('
    }

    function returnToHome()
    {
        navigate(`/`);
    }

    return (
        <div id="error-display">
            <h2>ERROR {error.status}</h2>
            <h3>{errorSubheadings[error.status]}</h3>
            <p>Sorry! {error.message}</p>
            <p>Return back to home by clicking the button below.</p>
            <button className="home-button" onClick={returnToHome}></button>
        </div>
    )
}