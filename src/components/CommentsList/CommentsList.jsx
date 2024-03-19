import './CommentsList.css';
import { useEffect, useState } from 'react';
import { useIsMaxWindowWidth } from '../../hooks/useIsMaxWindowWidth.jsx';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.jsx';
import { getCommentsByArticleID, getUsers } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import CommentPost from '../CommentPost/CommentPost.jsx';
import CommentCard from '../CommentCard/CommentCard.jsx';
import BackToTopButton from '../BackToTopButton/BackToTopButton.jsx';

export default function CommentsList({ articleID })
{
    const isMaxWindowWidth = useIsMaxWindowWidth();
    const [commentsObj, setCommentsObj] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [pageQuery, setPageQuery] = useState(2);
    const [isLoadingMore, setIsLoadingMore] = useInfiniteScroll(loadMoreComments);

    function loadMoreComments()
    {
        if (pageQuery > 1 &&
            pageQuery <= Math.ceil(commentsObj.totalCount / (isMaxWindowWidth ? 12 : 10)))
        {
            const limitQuery = isMaxWindowWidth ? 12 : 10;
            setTimeout(() =>
            {
                getCommentsByArticleID(articleID, pageQuery, limitQuery)
                    .then((commentsData) =>
                    {
                        setCommentsObj((currentCommentsObj) =>
                        {
                            let newCommentsObj = { comments: [], totalCount: commentsData.totalCount};
                            currentCommentsObj.comments && newCommentsObj.comments.push(...currentCommentsObj.comments);
                            newCommentsObj.comments.push(...commentsData.comments);
                            return newCommentsObj;
                        })
                        setPageQuery(pageQuery + 1);
                        setIsLoadingMore(false);
                    });
            }, 1000)
        }
        else
        {
            setIsLoadingMore(false);
        }
    }

    useEffect(() =>
    {
        setIsLoading(true);
        const limitQuery = isMaxWindowWidth ? 12 : 10;
        getCommentsByArticleID(articleID, 1, limitQuery)
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
    }, [articleID, isMaxWindowWidth]);

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
                    return (
                        <li key={comment.comment_id}>
                            <CommentCard comment={comment} author={author} setCommentsObj={setCommentsObj} />
                        </li>
                    )
                })
            }
            </ul>
            {isLoadingMore && <Loader />}
            <BackToTopButton />
        </>
    );
}