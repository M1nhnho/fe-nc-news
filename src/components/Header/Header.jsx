import './Header.css';
import UserBar from "../UserBar/UserBar.jsx";
import Nav from "../Nav/Nav.jsx";

export default function Header()
{
    return (
        <header>
            <h1>NC News</h1>
            <UserBar />
            <Nav />
        </header>
    )
}