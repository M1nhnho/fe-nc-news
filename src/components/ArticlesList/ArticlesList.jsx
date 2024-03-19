import './ArticlesList.css';
import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { useIsMaxWindowWidth } from '../../hooks/useIsMaxWindowWidth.jsx';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.jsx';
import { getArticles, getUsers } from "../../utils/api.js";
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay.jsx';
import Loader from "../Loader/Loader.jsx";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";
import BackToTopButton from '../BackToTopButton/BackToTopButton.jsx';

export default function ArticlesList()
{
    const { topic } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const sortByQuery = searchParams.get('sort_by');
    const orderQuery = searchParams.get('order');
    const isMaxWindowWidth = useIsMaxWindowWidth();
    
    const [articlesObj, setArticlesObj] = useState({});
    const [users, setUsers] = useState([]);
    const [errorObj, setErrorObj] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [pageQuery, setPageQuery] = useState(2);
    const [isLoadingMore, setIsLoadingMore] = useInfiniteScroll(loadMoreArticles);

    function setSortBy(sortByValue)
    {
        const newParams = new URLSearchParams(searchParams);
        newParams.set('sort_by', sortByValue);
        setSearchParams(newParams);
    }

    function setOrder(isAscending)
    {
        const newParams = new URLSearchParams(searchParams);
        const direction = isAscending ? 'asc' : 'desc'
        newParams.set('order', direction);
        setSearchParams(newParams);
    }

    function scrollBackToTop()
    {
        topicHeadingRef.current.scrollIntoView();
    }

    function loadMoreArticles()
    {
        if (pageQuery > 1 &&
            pageQuery <= Math.ceil(articlesObj.totalCount / (isMaxWindowWidth ? 12 : 10)))
        {
            const limitQuery = isMaxWindowWidth ? 12 : 10;
            setTimeout(() =>
            {
                getArticles(topic, sortByQuery, orderQuery, pageQuery, limitQuery)
                    .then((articlesData) =>
                    {
                        setArticlesObj((currentArticlesObj) =>
                        {
                            let newArticlesObj = { articles: [], totalCount: articlesData.totalCount};
                            currentArticlesObj.articles && newArticlesObj.articles.push(...currentArticlesObj.articles);
                            newArticlesObj.articles.push(...articlesData.articles);
                            return newArticlesObj;
                        })
                        setPageQuery(pageQuery + 1);
                        setIsLoadingMore(false);
                    });
            }, 1000)
        }
        else
        {
            setIsLoadingMore(false);
        }
    }

    useEffect(() =>
    {
        setIsLoading(true);
        setErrorObj(null);
        const limitQuery = isMaxWindowWidth ? 12 : 10;
        Promise.all([getArticles(topic, sortByQuery, orderQuery, 1, limitQuery), getUsers()])
            .then(([articlesData, usersData]) =>
            {
                setArticlesObj(articlesData);
                setUsers(usersData);
                setPageQuery(2);
                setIsLoading(false);
            })
            .catch((error) =>
            {
                if (error.response.status === 400)
                {
                    let queries = '';
                    sortByQuery && (queries += `\nSort by: ${sortByQuery}`);
                    orderQuery && (queries += `\nOrder by: ${orderQuery}`);
                    setErrorObj(
                        {
                            status: error.response.status,
                            message: `\nSeems your queries has a mistake${queries}`
                        }
                    )
                }
                else if (error.response.status === 404)
                {
                    setErrorObj(
                        {
                            status: error.response.status,
                            message: `The topic\n${topic}\ndoes not seem to exist...`
                        }
                    )
                }
                else
                {
                    setErrorObj(
                        {
                            status: error.response.status,
                            message: 'Something went wrong...'
                        }
                    )
                }
            });
    }, [topic, sortByQuery, orderQuery, isMaxWindowWidth]);

    return (
        errorObj ? <ErrorDisplay error={errorObj} /> : 
        <>
            <h2>{topic}</h2>
            <div id="articles-info">
                <span>{!isLoading && `${articlesObj.totalCount} articles found!`}</span>
                <div id="articles-queries">
                    <label aria-label="Order articles by ascending or descending" htmlFor="articles-order-checkbox" id="articles-order-label">
                        <input
                            type="checkbox"
                            id="articles-order-checkbox"
                            checked={orderQuery === 'asc'}
                            onChange={(event) => setOrder(event.target.checked)}
                        />
                        <div className="button--blue circle-button" id="articles-order-switch"></div>
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
                            return (
                                <li key={article.article_id}>
                                    <ArticleCard article={article} author={author} />
                                </li>
                            )
                        })
                    }
                    </ul>
                    {isLoadingMore && <Loader />}
                    <BackToTopButton />
                </>
            }
        </>
    )
}