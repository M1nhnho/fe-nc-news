import './ArticlesList.css';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getArticles, getUsers } from "../../utils/api.js";
import Loader from "../Loader/Loader.jsx";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";

export default function ArticlesList()
{
    const { topic } = useParams();
    const [articlesObj, setArticlesObj] = useState({});
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getArticles(topic)
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
    }, [topic]);

    return (
        isLoading ? <Loader /> :
        <>
            <h2>{topic.toUpperCase()}</h2>
            <p>{articlesObj.totalCount} articles found!</p>
            <ul id="articles-list">
            {
                articlesObj.articles.map((article) =>
                {
                    const author = users.find((user) => user.username === article.author);
                    return <ArticleCard key={article.article_id} article={article} author={author} />
                })
            }
            </ul>
        </>
    )
}