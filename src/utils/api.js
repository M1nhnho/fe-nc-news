import axios from 'axios';

const ncNewsAPI = axios.create({ baseURL: 'https://nc-news-452q.onrender.com/api/' });

export function getTopics()
{
    return ncNewsAPI.get('/topics')
        .then(({ data: {topics} }) =>
        {
            return topics;
        });
}

export function getArticles(topic)
{
    const query = topic === 'all' ? null : { params: {topic} };
    return ncNewsAPI.get(`articles`, query)
        .then(({ data: {articles, total_count} }) =>
        {
            return { articles, totalCount: total_count };
        });
}

export function getArticleByID(id)
{
    return ncNewsAPI.get(`articles/${id}`)
        .then(({ data: {article} }) =>
        {
            return article;
        });
}

export function patchArticleByArticleID(id, inc_votes)
{
    return ncNewsAPI.patch(`articles/${id}`, { inc_votes })
        .then(({ data: {article} }) =>
        {
            return article;
        });
}

export function getCommentsByArticleID(articleID)
{
    return ncNewsAPI.get(`articles/${articleID}/comments`)
        .then(({ data: {comments, total_count} }) =>
        {
            return { comments, totalCount: total_count };
        });
}

export function postCommentAtArticleID(articleID, username, body)
{
    return ncNewsAPI.post(`articles/${articleID}/comments`, { username, body })
        .then(({ data: {comment} }) =>
        {
            return comment;
        });
}

export function patchCommentByID(id, inc_votes)
{
    return ncNewsAPI.patch(`comments/${id}`, { inc_votes })
        .then(({ data: {comment} }) =>
        {
            return comment;
        });
}

export function deleteCommentByID(id)
{
    return ncNewsAPI.delete(`comments/${id}`);
}

export function getUsers()
{
    return ncNewsAPI.get('users')
        .then(({ data: {users} }) =>
        {
            return users;
        });
}

export function getUserByUsername(username)
{
    return ncNewsAPI.get(`users/${username}`)
        .then(({ data: {user} }) =>
        {
            return user;
        });
}