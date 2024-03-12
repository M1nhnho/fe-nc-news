import './ArticleCard.css';
import { useNavigate } from "react-router-dom";
import UserTag from '../UserTag/UserTag';

export default function ArticleCard({ article, author })
{
    const navigate = useNavigate();
    
    function viewArticle()
    {
        navigate(`/articles/${article.article_id}`);
    }

    return (
        <li className="card-base article-card" onClick={viewArticle}>
            <div className="article-img-container">
                <img src={article.article_img_url} />
                <div className="article-img-footer">
                    <b>{article.topic}</b>
                    <span>{article.created_at.split('T')[0]}</span>
                </div>
            </div>
            <h3>{article.title}</h3>
            <UserTag user={author} />
            <div className="article-card-footer">
                <p className="article-votes">Votes: {article.votes}</p>
                <div className="comment-count"><b>{article.comment_count}</b></div>
            </div>
        </li>
    )
}