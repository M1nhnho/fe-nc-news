import './ArticleCard.css';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { getUserByUsername } from '../../utils/api';

export default function ArticleCard({ article })
{
    const navigate = useNavigate();
    const [author, setAuthor] = useState({});
    
    function viewArticle()
    {
        navigate(`/articles/${article.article_id}`);
    }

    useEffect(() =>
    {
        getUserByUsername(article.author)
            .then((userData) =>
            {
                setAuthor(userData);
            });
    }, []);

    return (
        <li id="article-card" onClick={viewArticle}>
            <img id="article-img" src={article.article_img_url} />
            <p>Topic: {article.topic}</p>
            <p>Date created: {article.created_at}</p>
            <h3>{article.title}</h3>
            <div className="user-info">
                <img src={author.avatar_url} />
                <p>{author.username} ({author.name})</p>
            </div>
            <p>Votes: {article.votes}</p>
            <p>Comments: {article.comment_count}</p>
        </li>
    )
}