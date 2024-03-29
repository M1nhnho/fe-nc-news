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
        <>
            <h2>Topics ({topics.length || '?'})</h2>
            <TopicCard topic={{ slug: 'all', description: 'Everything!' }} />
            {
                isLoading ? <Loader /> :
                <ul className="cards-list" id="topics-list">
                {
                    topics.map((topic) =>
                    {
                        return <TopicCard key={topic.slug} topic={topic} />
                    })
                }
                </ul>
            }
        </>
    )
}