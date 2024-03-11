import axios from 'axios';

const ncNewsAPI = axios.create({ baseURL: 'https://nc-news-452q.onrender.com/api' });

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
    const query = topic === 'all' ? '' : `?topic=${topic}`;
    return ncNewsAPI.get(`/articles${query}`)
        .then(({ data }) =>
        {
            return data.articles;
        });
}

export function getUserByUsername(username)
{
    return ncNewsAPI.get(`/users/${username}`)
        .then(({ data }) =>
        {
            return data.user;
        });
}