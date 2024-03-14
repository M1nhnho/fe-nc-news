import './Home.css';
import TopicsList from '../TopicsList/TopicsList';
import TopicCard from '../TopicCard/TopicCard';

export default function Home()
{
    return (
        <>
            <h2>HOME</h2>
            <TopicCard topic={{ slug: 'all', description: 'Everything!' }} />
            <TopicsList />
        </>
    )
}