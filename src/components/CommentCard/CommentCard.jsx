import './CommentCard.css';
import UserTag from '../UserTag/UserTag';

export default function CommentCard({ comment, author })
{
    return (
        <li className="card-base comment-card">
            <UserTag user={author} />
            <span>{comment.created_at.split('T')[0]}</span>
            <p>{comment.body}</p>
            <span>Votes: {comment.votes}</span>
        </li>
    );
}