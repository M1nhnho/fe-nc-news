import './UserBar.css';
import { useContext } from "react"
import { UserContext } from '../../contexts/User.jsx';
import UserTag from '../UserTag/UserTag.jsx';

export default function UserBar()
{
    const { user } = useContext(UserContext);

    return (
        <div className='user-bar'>
            <UserTag user={user} />
        </div>
    )
}