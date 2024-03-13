import './UserTag.css';

export default function UserTag({ user })
{
    return (
        <div className="user-tag">
            <img src={user.avatar_url} />
            <span className="user-tag__username">{user.username}</span>
            <span className="user-tag__name">&nbsp;({user.name})</span>
        </div>
    )
}