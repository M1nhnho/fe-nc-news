import './ArticleFull.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getArticleByID, getUserByUsername } from '../../utils/api.js';
import Loader from '../Loader/Loader.jsx';
import BaseCard from '../BaseCard/BaseCard.jsx';
import UserTag from '../UserTag/UserTag.jsx';
import CommentsList from '../CommentsList/CommentsList.jsx';

export default function ArticleFull()
{
    const { article_id: articleID } = useParams()
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getArticleByID(articleID)
            .then((articleData) =>
            {
                setArticle(articleData);
            });
    }, [articleID]);

    useEffect(() =>
    {
        if (article.author)
        {
            getUserByUsername(article.author)
                .then((userData) =>
                {
                    setAuthor(userData);
                    setIsLoading(false);
                });
            return;
        }
    }, [article])

    return (
        isLoading ? <Loader /> :
        <>
            <article>
                <BaseCard cardType="article-full" cardObj={article}>
                    <h3>{article.title}</h3>
                    <UserTag user={author} />
                    <p>{article.body}</p>
                </BaseCard>
            </article>
            <CommentsList articleID={articleID} />
        </>
    );
}