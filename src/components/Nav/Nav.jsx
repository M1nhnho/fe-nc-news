import './Nav.css'
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getTopics } from "../../utils/api.js";

export default function Nav()
{
    const [topics, setTopics] = useState([]);

    useEffect(() =>
    {
        getTopics()
            .then((topicsData) =>
            {
                setTopics(topicsData);
            });
    }, []);

    return (
        <nav>
            <Link to='/topics/all'>All</Link>
            {
                topics.map((topic) =>
                {
                    return <Link to={`/topics/${topic.slug}`} key={topic.slug}>{topic.slug}</Link>
                })
            }
        </nav>
    );
}