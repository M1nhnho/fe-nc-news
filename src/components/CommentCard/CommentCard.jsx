import './CommentCard.css';
import { useState } from "react"
import { deleteCommentByID } from '../../utils/api.js';
import BaseCard from '../BaseCard/BaseCard.jsx';
import UserTag from '../UserTag/UserTag.jsx';

export default function CommentCard({ comment, author, setCommentsObj })
{
    const [commentClasses, setCommentClasses] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    function deleteComment()
    {
        setIsDeleting(true);
        setCommentClasses('deletion--pending')
        deleteCommentByID(comment.comment_id)
            .then(() =>
            {
                setCommentClasses('deletion--successful');
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
                setCommentClasses('deletion--unsuccessful');
                setTimeout(() =>
                {
                    setCommentClasses('');
                }, 5000);
                setIsDeleting(false);
            });
    }

    return (
        <div className={commentClasses}>
            <BaseCard cardType="comment-card" cardObj={comment} deleteFunction={deleteComment} deletionClasses={commentClasses} isDeleting={isDeleting}>
                <UserTag user={author} />
                <span className="comment-date-created">{comment.created_at.split('T')[0]} ({comment.created_at.split('T')[1].slice(0, 5)})</span>
                <p>{comment.body}</p>
            </BaseCard>
        </div>
    );
}