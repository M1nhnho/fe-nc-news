import './ArticleLatest.css';
import { useEffect, useState } from 'react';
import { getArticles, getUsers } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import ArticleCard from '../ArticleCard/ArticleCard.jsx';

export default function ArticleLatest()
{
    const [latestArticle, setLatestArticle] = useState({});
    const [latestAuthor, setLatestAuthor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getArticles(null, null, null, null, 1)
            .then((articleData) =>
            {
                setLatestArticle(articleData.articles[0]);
            });
    }, [])

    useEffect(() =>
    {
        if (Object.keys(latestArticle).length > 0)
        {
            getUsers()
                .then((usersData) =>
                {
                    setLatestAuthor(usersData.find((user) => user.username === latestArticle.author));
                    setIsLoading(false);
                });
        }
    }, [latestArticle])

    return (
        <>
            <h2>Latest Article</h2>
            {
                isLoading ? <Loader /> :
                <ArticleCard article={latestArticle} author={latestAuthor} />
            }
        </>
    )
}