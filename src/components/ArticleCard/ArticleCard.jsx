import './ArticleCard.css';
import { useNavigate } from "react-router-dom";
import UserTag from '../UserTag/UserTag.jsx';
import BaseCard from '../BaseCard/BaseCard.jsx';

export default function ArticleCard({ article, author })
{
    const navigate = useNavigate();
    
    function viewArticle()
    {
        navigate(`/articles/${article.article_id}/comments`);
    }

    return (
        <li>
            <article>
                <BaseCard cardType="article-card" cardObj={article} viewFunction={viewArticle}>
                    <h3>{article.title}</h3>
                    <UserTag user={author} />
                </BaseCard>
            </article>
        </li>
    )
}