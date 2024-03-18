import './ArticleFull.css';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { getArticleByID, getUserByUsername } from '../../utils/api.js';
import ErrorDisplay from '../ErrorDisplay/ErrorDisplay.jsx';
import Loader from '../Loader/Loader.jsx';
import BaseCard from '../BaseCard/BaseCard.jsx';
import UserTag from '../UserTag/UserTag.jsx';
import CommentsList from '../CommentsList/CommentsList.jsx';

export default function ArticleFull()
{
    const { article_id: articleID } = useParams()
    const [article, setArticle] = useState({});
    const [author, setAuthor] = useState({});
    const [errorNotFound, setErrorNotFound] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>
    {
        setIsLoading(true);
        getArticleByID(articleID)
            .then((articleData) =>
            {
                setArticle(articleData);
            })
            .catch((error) =>
            {
                setErrorNotFound(
                    {
                        status: error.response.status,
                        message: `The article\nID: ${articleID}\ndoes not seem to exist...`
                    }
                )
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
                })
                .catch((error) =>
                {
                    setErrorNotFound(
                        {
                            status: error.response.status,
                            message: `The user\n${article.author}\ndoes not seem to exist...`
                        }
                    )
                });
            return;
        }
    }, [article])

    return (
        errorNotFound ? <ErrorDisplay error={errorNotFound} /> :
            isLoading ? <Loader /> :
            <>
                <h2>Article</h2>
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