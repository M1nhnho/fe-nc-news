import './ArticleFull.css';
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { getArticleByID, getUserByUsername } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import CommentCard from '../CommentCard/CommentCard.jsx';

export default function ArticleFull()
{
    const { article_id } = useParams()
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getArticleByID(article_id)
            .then((articleData) =>
            {
                setArticle(() => { return articleData });
            });
    }, [article_id]);

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
            <div className="article-base article-full">
                <div className="article-img-container">
                    <img src={article.article_img_url} />
                    <div className="article-img-footer">
                        <b>{article.topic}</b>
                        <span>{article.created_at.split('T')[0]}</span>
                    </div>
                </div>
                <h3>{article.title}</h3>
                <div className="user-info">
                    <img src={author.avatar_url} />
                    <span>{author.username} ({author.name})</span>
                </div>
                <p>{article.body}</p>
                <p>Votes: {article.votes}</p>
            </div>
            <CommentCard />
        </>
    );
}