import './Header.css';
import { useNavigate } from 'react-router-dom';
import UserBar from "../UserBar/UserBar.jsx";
import Nav from "../Nav/Nav.jsx";

export default function Header()
{
    const navigate = useNavigate();

    function returnToHome()
    {
        navigate(`/`);
    }

    return (
        <header>
            <div id="title-container" onClick={returnToHome}>
                <button aria-label="Return to home" className="home-button"></button>
                <h1>NC News</h1>
            </div>
            <UserBar />
            <Nav />
        </header>
    )
}