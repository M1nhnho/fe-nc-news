import './VoteWidget.css';
import { useState } from 'react';
import { patchArticleByArticleID, patchCommentByID } from '../../utils/api.js';

export default function VoteWidget({ parentType, votes, parentID })
{
    const [localVotes, setLocalVotes] = useState(votes);
    const [isVoted, setIsVoted] = useState(0); // 1: upvoted, 0: none, -1: downvoted

    function sendVote(event, incrementVotes)
    {
        event.stopPropagation();
        const voteDifference = isVoted === incrementVotes ? incrementVotes * -1 : incrementVotes - isVoted;
        setIsVoted(isVoted === incrementVotes ? 0 : incrementVotes)
        setLocalVotes((currentLocalVotes) => currentLocalVotes + voteDifference);
        if (parentType === 'article')
        {
            patchArticleByArticleID(parentID, voteDifference)
                .catch((error) =>
                {
                    setLocalVotes((currentLocalVotes) => currentLocalVotes - voteDifference);
                });
        }
        else if (parentType === 'comment')
        {
            patchCommentByID(parentID, voteDifference)
                .catch((error) =>
                {
                    setLocalVotes((currentLocalVotes) => currentLocalVotes - voteDifference);
                });
        }
        else
        {
            setLocalVotes((currentLocalVotes) => currentLocalVotes - voteDifference);
        }
    }

    return (
        <div className="vote-widget">
            <button aria-label="Upvote" className={`circle-button circle-button--upvote ${isVoted === 1 ? 'active' : ''}`} onClick={(event) => { sendVote(event, 1) }}></button>
            <button aria-label="Downvote" className={`circle-button circle-button--downvote ${isVoted === -1 ? 'active' : ''}`} onClick={(event) => { sendVote(event, -1) }}></button>
            <span>{localVotes}</span>
        </div>
    )
}