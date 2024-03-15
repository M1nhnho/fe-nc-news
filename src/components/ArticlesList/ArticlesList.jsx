import './ArticlesList.css';
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { useIsMaxWindowWidth } from '../../hooks/useIsMaxWindowWidth.jsx';
import { getArticles, getUsers } from "../../utils/api.js";
import Loader from "../Loader/Loader.jsx";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";
import PagesNav from '../PagesNav/PagesNav.jsx';

export default function ArticlesList()
{
    const { topic } = useParams();
    
    const [searchParams, setSearchParams] = useSearchParams();
    const sortByQuery = searchParams.get('sort_by');
    const orderQuery = searchParams.get('order');
    const pageQuery = searchParams.get('p')
    const isMaxWindowWidth = useIsMaxWindowWidth();

    const [articlesObj, setArticlesObj] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    function setSortBy(sortByValue)
    {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', sortByValue);
        setSearchParams(newParams);
    }

    function setOrder(isDescending)
    {
        const newParams = new URLSearchParams(searchParams);
        const direction = isDescending ? 'desc' : 'asc'
        newParams.set('order', direction);
        setSearchParams(newParams);
    }

    function setPage(pageNumber)
    {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('p', pageNumber);
        setSearchParams(newParams);
    }

    useEffect(() =>
    {
        setIsLoading(true);
        const limitQuery = isMaxWindowWidth ? 12 : 10;
        getArticles(topic, sortByQuery, orderQuery, pageQuery, limitQuery)
            .then((articlesData) =>
            {
                setArticlesObj(articlesData);
                return getUsers();
            })
            .then((usersData) =>
            {
                setUsers(usersData);
                setIsLoading(false);
            });
    }, [topic, sortByQuery, orderQuery, pageQuery, isMaxWindowWidth]);

    return (
        <>
            <h2>{topic.toUpperCase()}</h2>
            <div id="articles-info">
                <span>{articlesObj.totalCount && `${articlesObj.totalCount} articles found!`}</span>
                <div id="articles-queries">
                    <label htmlFor="articles-order-checkbox" className="switch">
                        <input type="checkbox" id="articles-order-checkbox" checked={orderQuery === 'desc'} onChange={(event) => setOrder(event.target.checked)} />
                        <div className="circle-button" id="articles-order-switch"></div>
                    </label>

                    <label htmlFor="articles-sort-by-select" id="articles-sort-by-label">Sort by</label>
                    <select id="articles-sort-by-select" value={sortByQuery || ''} onChange={(event) => setSortBy(event.target.value)}>
                        <option value="created_at">Date</option>
                        <option value="comment_count">Comment Count</option>
                        <option value="votes">Votes</option>
                    </select>
                </div>
            </div>
            {
                isLoading ? <Loader /> :
                <>
                    <ul className="cards-list">
                    {
                        articlesObj.articles.map((article) =>
                        {
                            const author = users.find((user) => user.username === article.author);
                            return <ArticleCard key={article.article_id} article={article} author={author} />
                        })
                    }
                    </ul>
                    <PagesNav totalCount={articlesObj.totalCount} isMaxWindowWidth={isMaxWindowWidth} setPage={setPage} />
                </>
            }
        </>
    )
}