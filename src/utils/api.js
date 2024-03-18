/*
Note regarding posting topics and articles:
While the API supports the above, I've decided against implementing them to avoid too much user influence on the database.
Ultimately this app is intended purely as a project showcase and so data used needs to stay relatively stable and appropriate.
For example, avoiding the creation of 100 articles of the same test article.
This also explains the lack of the delete button on articles and one hardcoded user to log in as.
*/ 

import axios from 'axios';

const ncNewsAPI = axios.create({ baseURL: 'https://nc-news-452q.onrender.com/api/' });

// --- TOPICS ---
export function getTopics()
{
    return ncNewsAPI.get('/topics')
        .then(({ data: {topics} }) =>
        {
            return topics;
        });
}

// postTopic() *Refer to note at top

// --- ARTICLES ---
export function getArticles(topic, sort_by, order, p, limit)
{
    const query = {};
    topic !== 'all' && (query.topic = topic);
    sort_by && (query.sort_by = sort_by);
    order && (query.order = order);
    p && (query.p = p);
    limit && (query.limit = limit);

    return ncNewsAPI.get(`articles`, { params: query })
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

// postArticle() *Refer to note at top

export function patchArticleByArticleID(id, inc_votes)
{
    return ncNewsAPI.patch(`articles/${id}`, { inc_votes })
        .then(({ data: {article} }) =>
        {
            return article;
        });
}

// --- COMMENTS ---
export function getCommentsByArticleID(articleID, p, limit)
{
    const query = {};
    p && (query.p = p);
    limit && (query.limit = limit);

    return ncNewsAPI.get(`articles/${articleID}/comments`, { params: query })
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

// --- USERS ---
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