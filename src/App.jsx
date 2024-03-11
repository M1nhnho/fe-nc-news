import './App.css'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import ArticlesList from './components/ArticlesList/ArticlesList.jsx'

export default function App()
{
    return (
        <>
            <Header />
            <Routes>
                <Route path="/topics/:topic" element={<ArticlesList />} />
            </Routes>
        </>
    )
}