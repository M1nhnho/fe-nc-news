import axios from 'axios';

const ncNewsAPI = axios.create({ baseURL: 'https://nc-news-452q.onrender.com/api/' });

export function getTopics()
{
    return ncNewsAPI.get('/topics')
        .then(({ data }) =>
        {
            return data.topics;
        });
}

export function getArticles(topic)
{
    const query = topic === 'all' ? null : { params: {topic} };
    return ncNewsAPI.get(`articles`, query)
        .then(({ data }) =>
        {
            return { articles: data.articles, total_count: data.total_count };
        });
}

export function getArticleByID(id)
{
    return ncNewsAPI.get(`articles/${id}`)
        .then(({ data }) =>
        {
            return data.article;
        });
}

export function getUsers()
{
    return ncNewsAPI.get('users')
        .then(({ data }) =>
        {
            return data.users;
        });
}

export function getUserByUsername(username)
{
    return ncNewsAPI.get(`users/${username}`)
        .then(({ data }) =>
        {
            return data.user;
        });
}