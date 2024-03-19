import './UserTag.css';
import { useContext } from 'react';
import { UserContext } from '../../contexts/User.jsx';

export default function UserTag({ user })
{
    const { user: loggedInUser } = useContext(UserContext);
    const userIsLoggedIn = loggedInUser && loggedInUser.username === user.username;

    return (
        <div className="user-tag">
            <img alt={`${user.username}'s profile avatar`} src={user.avatar_url} />
            <span
                className={`user-tag__username ${userIsLoggedIn ? 'user-tag__username--logged-in' : ''}`}
                username={user.username}
            >{user.username}</span>
            <span className="user-tag__name">&nbsp;({user.name})</span>
        </div>
    )
}