import './TopicCard.css';
import { useNavigate } from "react-router-dom";
import BaseCard from '../BaseCard/BaseCard.jsx';

export default function TopicCard({ topic })
{
    const navigate = useNavigate();
    
    function viewArticlesFromTopic()
    {
        navigate(`/topics/${topic.slug}`);
    }

    return (
        <li className="topic-list-item">
            <BaseCard cardType="topic-card" cardObj={topic} viewFunction={viewArticlesFromTopic}>
                <h3>➜ {topic.slug}</h3>
                <span>{topic.description}</span>
            </BaseCard>
        </li>
    )
}