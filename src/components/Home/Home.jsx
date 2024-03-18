import './Home.css';
import ArticleLatest from '../ArticleLatest/ArticleLatest.jsx';
import TopicsList from '../TopicsList/TopicsList.jsx';
import Statistics from '../Statistics/Statistics.jsx';

export default function Home()
{
    return (
        <>
            <h1>Home</h1>
            <ArticleLatest />
            <TopicsList />
            <h2>Statistics</h2>
            <Statistics />
        </>
    )
}