import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { UserProvider } from './contexts/User.jsx';
import Header from './components/Header/Header.jsx';
import Home from './components/Home/Home.jsx';
import ArticlesList from './components/ArticlesList/ArticlesList.jsx';
import ArticleFull from './components/ArticleFull/ArticleFull.jsx';
import ErrorNotFound from './components/ErrorDisplay/ErrorDisplay.jsx';

export default function App()
{
    return (
        <UserProvider>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/topics" element={<Navigate to={'/'} />} />
                <Route path="/topics/:topic" element={<ArticlesList />} />
                <Route path="/articles/:article_id" element={<Navigate to={`${window.location.pathname}/comments`} />} />
                <Route path="/articles/:article_id/comments" element={<ArticleFull />} />
                <Route path="*" element={<ErrorNotFound error={{ status: 404, message: `The URL\n${window.location.pathname}\ndoes not seem to exist...`}} />} />
            </Routes>
        </UserProvider>
    )
}