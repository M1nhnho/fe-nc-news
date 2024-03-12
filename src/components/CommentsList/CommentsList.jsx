import './CommentsList.css';
import { useEffect, useState } from 'react';
import { getCommentsByArticleID, getUsers } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import CommentCard from '../CommentCard/CommentCard.jsx';

export default function CommentsList({ articleID, commentCount })
{
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getCommentsByArticleID(articleID)
            .then((commentsData) =>
            {
                setComments(commentsData);
                return getUsers();
            })
            .then((usersData) =>
            {
                setUsers(usersData);
                setIsLoading(false);
            });
    }, [articleID]);

    return (
        isLoading ? <Loader /> :
        <>
            <h3>Comments ({commentCount})</h3>
            <ul className="comments-list">
            {
                comments.map((comment) =>
                {
                    const author = users.find((user) => user.username === comment.author);
                    return <CommentCard comment={comment} author={author} />
                })
            }
            </ul>
        </>
    );
}