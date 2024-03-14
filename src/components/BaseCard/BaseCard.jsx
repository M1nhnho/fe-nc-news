import './BaseCard.css';
import React, { useContext, useState } from "react"
import { UserContext } from '../../contexts/User.jsx';
import VoteWidget from '../VoteWidget/VoteWidget.jsx';

export default function BaseCard({ children, cardType, cardObj, viewFunction, deleteFunction, deletionClasses, isDeleting })
{
    const { user } = useContext(UserContext);
    const [rotateCardDegrees, setRotateCardDegrees] = useState({ x: 0, y: 0 });
    const [type, subtype] = cardType.split('-');

    function rotateCard(event)
    {
        const cardRect = event.currentTarget.getBoundingClientRect();
        const cardCentreX = cardRect.width / 2;
        const cardCentreY = cardRect.height / 2;

        const mouseRelativeToCardX = event.clientX - cardRect.left;
        const mouseRelativeToCardY = event.clientY - cardRect.top;

        const rotateX = (mouseRelativeToCardX - cardCentreX) / cardCentreX * 5;
        const rotateY = (mouseRelativeToCardY - cardCentreY) / cardCentreY * 5;
        setRotateCardDegrees({ x: rotateX, y: rotateY });
    }

    return (
        <div className={viewFunction && 'grow-hover'}>
            <div
                className={`base-card ${cardType} ${viewFunction && 'glow-hover'} ${deletionClasses}`}
                onClick={viewFunction}
                onMouseMove={subtype !== 'full' ? rotateCard : undefined}
                onMouseLeave={() => setRotateCardDegrees({ x: 0, y: 0 })}
                style={
                    { transform: `perspective(1000px) rotateX(${-1 * rotateCardDegrees.y}deg) rotateY(${rotateCardDegrees.x}deg)` }
                }>
            {
                type === 'article' &&
                <div className="article-img-container">
                    <img src={cardObj.article_img_url} />
                    <div className="article-img-container__footer">
                        <b>{cardObj.topic}</b>
                        <span>
                            {cardObj.created_at.split('T')[0]}
                            <span className="article-date-created">&nbsp;({cardObj.created_at.split('T')[1].slice(0, 5)})</span>
                        </span>
                    </div>
                </div>
            }
            {children}
            {
                type !== 'topic' &&
                <div className="base-card__footer">
                    <VoteWidget parentType={type} votes={cardObj.votes} parentID={cardObj[`${type}_id`]}/>
                    {
                        type === 'article' && subtype === 'card' &&
                        <div className="comment-count"><b>{cardObj.comment_count}</b></div>
                    }
                    {
                        deleteFunction && user.username === cardObj.author &&
                        <button className="circle-button circle-button--delete" onClick={deleteFunction} disabled={isDeleting}></button>
                    }
                </div>
            }
            </div>
        </div>
    )
}