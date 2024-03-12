import './UserTag.css';

export default function UserTag({ user })
{
    return (
        <div className="user-tag">
            <img src={user.avatar_url} />
            <span>{user.username} ({user.name})</span>
        </div>
    )
}