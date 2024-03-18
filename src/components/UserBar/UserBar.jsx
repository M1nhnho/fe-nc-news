import './UserBar.css';
import { useContext, useEffect, useState } from "react"
import { UserContext } from '../../contexts/User.jsx';
import UserTag from '../UserTag/UserTag.jsx';

export default function UserBar()
{
    const { user, setUser } = useContext(UserContext);
    const [lastLoggedUser, setLastLoggedUser] = useState(null);

    function logInOutUser()
    {
        user ? setUser(null) :
        setUser({ username: "tickle122", name: "Tom Tickle", avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953" });
    }

    useEffect(() =>
    {
        if (user)
        {
            const isLastLoggedUser = lastLoggedUser && lastLoggedUser.username === user.username;
            !isLastLoggedUser && setLastLoggedUser({...user});
        }
    }, [user]);

    return (
        <div className="base-bar user-bar">
            {lastLoggedUser && <UserTag user={lastLoggedUser} />}
            <button 
                aria-label="Log in or out the user tickle122"
                id={user ? 'logout-button' : 'login-button'}
                className={user ? 'button--red' : 'button--blue'}
                onClick={logInOutUser}
            ></button>
        </div>
    )
}