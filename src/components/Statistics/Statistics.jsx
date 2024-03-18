import './Statistics.css';
import { useEffect, useState } from 'react';
import Loader from '../Loader/Loader.jsx';
import { getArticles, getTopics, getUsers } from '../../utils/api';

export default function Statistics()
{
    const [articlesCount, setArticlesCount] = useState(0);
    const [topicsCount, setTopicsCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        Promise.all([getArticles(null, null, null, null, 1), getTopics(), getUsers()])
            .then(([articleData, topicsData, usersData]) =>
            {
                setArticlesCount(articleData.totalCount);
                setTopicsCount(topicsData.length);
                setUsersCount(usersData.length);
                setIsLoading(false);
            });
    }, [])

    return (
        isLoading ? <Loader /> :
        <div id="statistics" className="base-card">
            <span>Articles:</span>
            <span>{articlesCount}</span>
            
            <span>Topics:</span>
            <span>{topicsCount}</span>

            <span>Users:</span>
            <span>{usersCount}</span>
        </div>
    )
}