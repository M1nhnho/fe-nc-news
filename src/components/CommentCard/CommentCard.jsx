import './CommentCard.css';
import UserTag from '../UserTag/UserTag';
import VoteWidget from '../VoteWidget/VoteWidget';

export default function CommentCard({ comment, author })
{
    return (
        <li className="card-base comment-card">
            <UserTag user={author} />
            <span>{comment.created_at.split('T')[0]}</span>
            <p>{comment.body}</p>
            <VoteWidget parentType="comment" votes={comment.votes} parentID={comment.comment_id}/>
        </li>
    );
}