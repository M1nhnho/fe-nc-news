import './CommentsList.css';
import { useEffect, useState } from 'react';
import { getCommentsByArticleID, getUsers } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import CommentCard from '../CommentCard/CommentCard.jsx';
import CommentPost from '../CommentPost/CommentPost.jsx';

export default function CommentsList({ articleID })
{
    const [commentsObj, setCommentsObj] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getCommentsByArticleID(articleID)
            .then((commentsData) =>
            {
                setCommentsObj(commentsData);
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
            <h3>Comments ({commentsObj.totalCount})</h3>
            <CommentPost articleID={articleID} setCommentsObj={setCommentsObj} />
            <ul className="comments-list">
            {
                commentsObj.comments.map((comment) =>
                {
                    const author = users.find((user) => user.username === comment.author);
                    return <CommentCard key={comment.comment_id} comment={comment} author={author} setCommentsObj={setCommentsObj} />
                })
            }
            </ul>
        </>
    );
}