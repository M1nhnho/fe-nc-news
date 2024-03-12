import './VoteWidget.css';
import { useEffect, useState } from 'react';
import { patchArticleByArticleID } from '../../utils/api';

export default function VoteWidget({ votes, articleID })
{
    const [localVotes, setLocalVotes] = useState(votes);

    function sendUpvote(event)
    {
        event.stopPropagation();
        patchArticleByArticleID(articleID, 1)
            .catch((error) =>
            {
                console.log(error);
                setLocalVotes((currentLocalVotes) => currentLocalVotes - 1)
            });
        setLocalVotes((currentLocalVotes) => currentLocalVotes + 1);
    }

    function sendDownvote(event)
    {
        event.stopPropagation();
        patchArticleByArticleID(articleID, -1)
            .catch((error) =>
            {
                console.log(error);
                setLocalVotes((currentLocalVotes) => currentLocalVotes + 1)
            });
        setLocalVotes((currentLocalVotes) => currentLocalVotes - 1);
    }

    return (
        <div className="vote-widget">
            <button className="upvote-button" onClick={sendUpvote}></button>
            <button className="downvote-button" onClick={sendDownvote}></button>
            <span>{localVotes}</span>
        </div>
    )
}