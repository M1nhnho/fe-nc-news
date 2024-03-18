import './TopicsNav.css'
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
        <nav id="topics-nav" className="base-bar">
            <Link to='/topics/all'>all</Link>
            {
                topics.map((topic) =>
                {
                    return <Link to={`/topics/${topic.slug}`} key={topic.slug}>{topic.slug}</Link>
                })
            }
        </nav>
    );
}