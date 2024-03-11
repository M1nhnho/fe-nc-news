import './ArticlesList.css';
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getArticles } from "../../utils/api.js";
import Loader from "../Loader/Loader.jsx";
import ArticleCard from "../ArticleCard/ArticleCard.jsx";

export default function ArticlesList()
{
    const { topic } = useParams();
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getArticles(topic)
            .then((articlesData) =>
            {
                setArticles(articlesData);
                setIsLoading(false);
            });
    }, [topic]);

    return (
        isLoading ? <Loader /> :
        <>
            <h2>{topic}</h2>
            <ul id="articles-list">
                {
                    articles.map((article) =>
                    {
                        return <ArticleCard key={article.article_id} article={article} />
                    })
                }
            </ul>
        </>
    )
}