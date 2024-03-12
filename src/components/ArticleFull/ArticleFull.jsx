import './ArticleFull.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getArticleByID, getUserByUsername } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import UserTag from '../UserTag/UserTag.jsx';
import CommentsList from '../CommentsList/CommentsList.jsx';
import VoteWidget from '../VoteWidget/VoteWidget.jsx';

export default function ArticleFull()
{
    const { article_id: articleID } = useParams()
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getArticleByID(articleID)
            .then((articleData) =>
            {
                setArticle(articleData);
            });
    }, [articleID]);

    useEffect(() =>
    {
        if (article.author)
        {
            getUserByUsername(article.author)
                .then((userData) =>
                {
                    setAuthor(userData);
                    setIsLoading(false);
                });
            return;
        }
    }, [article])

    return (
        isLoading ? <Loader /> :
        <>
            <article className="card-base article-full">
                <div className="article-img-container">
                    <img src={article.article_img_url} />
                    <div className="article-img-footer">
                        <b>{article.topic}</b>
                        <span>{article.created_at.split('T')[0]}</span>
                    </div>
                </div>
                <h3>{article.title}</h3>
                <UserTag user={author} />
                <p>{article.body}</p>
                <VoteWidget parentType="article" votes={article.votes} parentID={articleID} />
            </article>
            <CommentsList articleID={articleID} commentCount={article.comment_count}/>
        </>
    );
}