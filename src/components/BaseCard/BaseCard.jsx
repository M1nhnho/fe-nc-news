import './BaseCard.css';
import { useContext } from "react"
import { UserContext } from '../../contexts/User.jsx';
import VoteWidget from '../VoteWidget/VoteWidget.jsx';

export default function BaseCard({ children, cardType, cardObj, viewFunction, deleteFunction, deletionClasses, isDeleting })
{
    const { user } = useContext(UserContext);
    const [type, subtype] = cardType.split('-');

    return (
        <div className={`base-card ${cardType} ${viewFunction && 'glow-hover'} ${deletionClasses}`} onClick={viewFunction}>
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
    )
}