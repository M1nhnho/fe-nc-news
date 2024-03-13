import './CommentCard.css';
import UserTag from '../UserTag/UserTag.jsx';
import VoteWidget from '../VoteWidget/VoteWidget.jsx';

export default function CommentCard({ comment, author })
{
    return (
        <li className="card-base comment-card">
            <UserTag user={author} />
            <span className="comment-card__date-created">{comment.created_at.split('T')[0]} ({comment.created_at.split('T')[1].slice(0, 5)})</span>
            <p>{comment.body}</p>
            <VoteWidget parentType="comment" votes={comment.votes} parentID={comment.comment_id}/>
        </li>
    );
}