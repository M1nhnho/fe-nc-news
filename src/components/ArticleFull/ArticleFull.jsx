import './ArticleFull.css';
import { useEffect, useRef, useState } from 'react';
import { useParams } from "react-router-dom";
import { getArticleByID, getUserByUsername } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';

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
        <div id="article-full">
            <img id="article-img" src={article.article_img_url} />
            <p>Topic: {article.topic}</p>
            <p>Date created: {article.created_at}</p>
            <h3>{article.title}</h3>
            <div className="user-info">
                <img src={author.avatar_url} />
                <p>{author.username} ({author.name})</p>
            </div>
            <p>{article.body}</p>
            <p>Votes: {article.votes}</p>
        </div>
    );
}