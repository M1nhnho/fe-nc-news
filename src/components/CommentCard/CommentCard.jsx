import './CommentCard.css';
import { useState } from "react"
import { deleteCommentByID } from '../../utils/api.js';
import BaseCard from '../BaseCard/BaseCard.jsx';
import UserTag from '../UserTag/UserTag.jsx';

export default function CommentCard({ comment, author, setCommentsObj })
{
    const [deletionClasses, setDeletionClasses] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    function deleteComment()
    {
        setIsDeleting(true);
        setDeletionClasses('deletion--pending');
        deleteCommentByID(comment.comment_id)
            .then(() =>
            {
                setDeletionClasses('deletion--successful');
                setTimeout(() =>
                {
                    setCommentsObj((currCommentsObj) =>
                    {
                        const commentsCopy = [...currCommentsObj.comments];
                        const deletedCommentIndex = commentsCopy.findIndex((currComment) => currComment.comment_id === comment.comment_id);
                        commentsCopy.splice(deletedCommentIndex, 1);
                        return { comments: commentsCopy, totalCount: currCommentsObj.totalCount - 1 }
                    })
                }, 1250);
            })
            .catch((error) =>
            {
                setDeletionClasses('deletion--unsuccessful');
                setTimeout(() =>
                {
                    setDeletionClasses('');
                }, 5000);
                setIsDeleting(false);
            });
    }

    return (
        <BaseCard
            cardType="comment-card"
            cardObj={comment}
            deleteFunction={deleteComment}
            deletionClasses={deletionClasses}
            isDeleting={isDeleting}
        >
            <UserTag user={author} />
            <span className="comment-date-created">{comment.created_at.split('T')[0]} ({comment.created_at.split('T')[1].slice(0, 5)})</span>
            <p>{comment.body}</p>
        </BaseCard>
    );
}