import './ArticleCard.css';
import { useNavigate } from "react-router-dom";
import UserTag from '../UserTag/UserTag';
import VoteWidget from '../VoteWidget/VoteWidget';

export default function ArticleCard({ article, author })
{
    const navigate = useNavigate();
    
    function viewArticle()
    {
        navigate(`/articles/${article.article_id}`);
    }

    return (
        <li className="card-base article-card" onClick={viewArticle}>
            <article>
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
                    <VoteWidget votes={article.votes} />
                    <div className="comment-count"><b>{article.comment_count}</b></div>
                </div>
            </article>
        </li>
    )
}