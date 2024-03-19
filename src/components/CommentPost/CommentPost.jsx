import './CommentPost.css';
import { useContext, useState } from "react"
import { UserContext } from '../../contexts/User.jsx';
import UserTag from '../UserTag/UserTag.jsx';
import { postCommentAtArticleID } from '../../utils/api.js';

export default function CommentPost({ articleID, setCommentsObj })
{
    const { user } = useContext(UserContext);
    const [body, setBody] = useState('');
    const [bodyClasses, setBodyClasses] = useState('');
    const [postMessage, setPostMessage] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    function handleSubmit(event)
    {
        event.preventDefault();
        if (body.length === 0)
        {
            setBodyClasses('unsuccessful');
            setPostMessage('Box cannot be empty!');
        }
        else
        {
            setIsPosting(true);
            setPostMessage('Posting comment...');
            postCommentAtArticleID(articleID, user.username, body)
                .then((comment) =>
                {
                    setBody('');
                    setBodyClasses('successful');
                    setPostMessage('Comment successfully posted!');
                    setCommentsObj((currCommentsObj) =>
                    {
                        return { comments: [comment, ...currCommentsObj.comments], totalCount: currCommentsObj.totalCount + 1 };
                    });
                    setIsPosting(false);
                })
                .catch((error) =>
                {
                    setBodyClasses('unsuccessful');
                    setPostMessage('Sorry! Something went wrong, please try again.');
                    setIsPosting(false);
                });
        }
    }

    return (
        user &&
        <div className="comment-post">
            <UserTag user={user} />
            <form className="base-card comment-form">
                <label htmlFor="comment-body-textarea">Comment Box:</label>
                <textarea
                    id="comment-body-textarea"
                    className={bodyClasses}
                    value={body}
                    onChange=
                    {
                        (event) =>
                        {
                            setBody(event.target.value);
                            setBodyClasses('');
                            setPostMessage('');
                        }
                    } />
                <div className="comment-form__footer">
                    <span>{postMessage}</span>
                    <button
                        aria-label="Post comment"
                        className="button--blue text-button comment-form__submit"
                        onClick={handleSubmit}
                        disabled={isPosting}
                    >Comment</button>
                </div>
            </form>
        </div>
    )
}