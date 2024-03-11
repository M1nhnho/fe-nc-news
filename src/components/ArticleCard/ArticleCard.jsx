import './ArticleCard.css';
import { useEffect, useState } from 'react';
import { getUserByUsername } from '../../utils/api';

export default function ArticleCard({ article })
{
    const [author, setAuthor] = useState({});
    
    useEffect(() =>
    {
        getUserByUsername(article.author)
            .then((userData) =>
            {
                setAuthor(userData);
            });
    }, []);

    return (
        <li id="article-card">
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