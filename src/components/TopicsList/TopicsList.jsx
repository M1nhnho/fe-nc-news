import './TopicsList.css';
import { useEffect, useState } from 'react';
import { getTopics } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import TopicCard from '../TopicCard/TopicCard.jsx';

export default function TopicsList()
{
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getTopics()
            .then((topicsData) =>
            {
                setTopics(topicsData);
                setIsLoading(false);
            });
    }, []);

    return (
        isLoading ? <Loader /> :
        <>
            <h2>Topics ({topics.length})</h2>
            <ul className="cards-list" id="topics-list">
            {
                topics.map((topic) =>
                {
                    return <TopicCard key={topic.slug} topic={topic} />
                })
            }
            </ul>
        </>
    )
}