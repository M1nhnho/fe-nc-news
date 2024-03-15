import './ErrorDisplay.css';
import { useNavigate } from 'react-router-dom';

export default function ErrorDisplay({ error })
{
    const navigate = useNavigate();

    function returnToHome()
    {
        navigate(`/`);
    }

    return (
        <div id="error-display">
            <h2>ERROR {error.status}</h2>
            {error.status === 404 && <h3>Page not found :(</h3>}
            <p>Sorry! {error.message}</p>
            <p>Return back to home by clicking the button below.</p>
            <button className="home-button" onClick={returnToHome}></button>
        </div>
    )
}