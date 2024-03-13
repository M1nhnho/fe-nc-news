import './CommentCard.css';
import { useContext, useState } from "react"
import { UserContext } from '../../contexts/User.jsx';
import UserTag from '../UserTag/UserTag.jsx';
import VoteWidget from '../VoteWidget/VoteWidget.jsx';
import { deleteCommentByID } from '../../utils/api.js';

export default function CommentCard({ comment, author, setCommentsObj })
{
    const { user } = useContext(UserContext);
    const [commentClasses, setCommentClasses] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    function deleteComment()
    {
        setIsDeleting(true);
        deleteCommentByID(comment.comment_id)
            .then(() =>
            {
                setCommentClasses('on-deletion');
                setTimeout(() =>
                {
                    setCommentsObj((currCommentsObj) =>
                    {
                        const commentsCopy = [...currCommentsObj.comments];
                        const deletedCommentIndex = commentsCopy.findIndex((currComment) => currComment.comment_id === comment.comment_id);
                        commentsCopy.splice(deletedCommentIndex, 1);
                        return { comments: commentsCopy, totalCount: currCommentsObj.totalCount - 1 }
                    })
                }, 1000);
            })
            .catch((error) =>
            {
                console.log(error);
                setIsDeleting(false);
            });
    }

    return (
        <li className={`card-base comment-card ${commentClasses}`}>
            <UserTag user={author} />
            <span className="comment-card__date-created">{comment.created_at.split('T')[0]} ({comment.created_at.split('T')[1].slice(0, 5)})</span>
            <p className='comment-card__body'>{comment.body}</p>
            <div className="comment-card__footer">
                <VoteWidget parentType="comment" votes={comment.votes} parentID={comment.comment_id}/>
                {
                    user.username === author.username
                    && <button className="circle-button circle-button--delete" onClick={deleteComment} disabled={isDeleting}></button>
                }
            </div>
        </li>
    );
}