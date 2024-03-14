import './TopicCard.css';
import { useNavigate } from "react-router-dom";

export default function TopicCard({ topic })
{
    const navigate = useNavigate();
    
    function viewArticlesFromTopic()
    {
        navigate(`/topics/${topic.slug}`);
    }

    return (
        <li className="card-base topic-card" onClick={viewArticlesFromTopic}>
            <h3>➜ {topic.slug}</h3>
            <span>{topic.description}</span>
        </li>
    )
}