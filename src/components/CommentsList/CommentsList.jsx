import './CommentsList.css';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useIsMaxWindowWidth } from '../../hooks/useIsMaxWindowWidth.jsx';
import { getCommentsByArticleID, getUsers } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import CommentPost from '../CommentPost/CommentPost.jsx';
import CommentCard from '../CommentCard/CommentCard.jsx';
import PagesNav from '../PagesNav/PagesNav.jsx';

export default function CommentsList({ articleID })
{
    const [searchParams, setSearchParams] = useSearchParams();
    const pageQuery = searchParams.get('p')
    const isMaxWindowWidth = useIsMaxWindowWidth();

    const [commentsObj, setCommentsObj] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function setPage(pageNumber)
    {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('p', pageNumber);
        setSearchParams(newParams);
    }

    useEffect(() =>
    {
        setIsLoading(true);
        const limitQuery = isMaxWindowWidth ? 12 : 10;
        getCommentsByArticleID(articleID, pageQuery, limitQuery)
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
    }, [articleID, pageQuery, isMaxWindowWidth]);

    return (
        isLoading ? <Loader /> :
        <>
            <h2>Comments ({commentsObj.totalCount})</h2>
            <CommentPost articleID={articleID} setCommentsObj={setCommentsObj} />
            <ul className="cards-list">
            {
                commentsObj.comments.map((comment) =>
                {
                    const author = users.find((user) => user.username === comment.author);
                    return <CommentCard key={comment.comment_id} comment={comment} author={author} setCommentsObj={setCommentsObj} />
                })
            }
            </ul>
            <PagesNav totalCount={commentsObj.totalCount} isMaxWindowWidth={isMaxWindowWidth} setPage={setPage} />
        </>
    );
}