import './App.css'
import { Route, Routes } from 'react-router-dom'
import { UserProvider } from './contexts/User.jsx'
import Header from './components/Header/Header.jsx'
import ArticlesList from './components/ArticlesList/ArticlesList.jsx'
import ArticleFull from './components/ArticleFull/ArticleFull.jsx'

export default function App()
{
    return (
        <UserProvider>
            <Header />
            <Routes>
                <Route path="/topics/:topic" element={<ArticlesList />} />
                <Route path="/articles/:article_id" element={<ArticleFull />} />
            </Routes>
        </UserProvider>
    )
}