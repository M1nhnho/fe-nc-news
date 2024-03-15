import './VoteWidget.css';
import { useState } from 'react';
import { patchArticleByArticleID, patchCommentByID } from '../../utils/api.js';

export default function VoteWidget({ parentType, votes, parentID })
{
    const [localVotes, setLocalVotes] = useState(votes);

    function sendVote(event, incrementVotes)
    {
        event.stopPropagation();
        setLocalVotes((currentLocalVotes) => currentLocalVotes + incrementVotes);
        if (parentType === 'article')
        {
            patchArticleByArticleID(parentID, incrementVotes)
                .catch((error) =>
                {
                    setLocalVotes((currentLocalVotes) => currentLocalVotes - incrementVotes);
                });
        }
        else if (parentType === 'comment')
        {
            patchCommentByID(parentID, incrementVotes)
                .catch((error) =>
                {
                    setLocalVotes((currentLocalVotes) => currentLocalVotes - incrementVotes);
                });
        }
        else
        {
            setLocalVotes((currentLocalVotes) => currentLocalVotes - incrementVotes);
        }
    }

    return (
        <div className="vote-widget">
            <button className="circle-button circle-button--upvote" onClick={(event) => { sendVote(event, 1) }}></button>
            <button className="circle-button circle-button--downvote" onClick={(event) => { sendVote(event, -1) }}></button>
            <span>{localVotes}</span>
        </div>
    )
}