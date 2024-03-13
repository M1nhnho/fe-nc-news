import './CommentPost.css';
import { useContext, useState } from "react"
import { UserContext } from '../../contexts/User.jsx';
import UserTag from '../UserTag/UserTag.jsx';
import { postCommentAtArticleID } from '../../utils/api.js';

export default function CommentPost({ articleID, setComments })
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
            postCommentAtArticleID(articleID, user.username, body)
                .then((comment) =>
                {
                    setBody('');
                    setBodyClasses('successful');
                    setPostMessage('Comment posted!');
                    setComments((currentComments) =>
                    {
                        return [comment, ...currentComments];
                    });
                    setIsPosting(false);
                })
                .catch((error) =>
                {
                    console.log(error);
                    setBodyClasses('unsuccessful');
                    setPostMessage('An error occurred, please try again.');
                    setIsPosting(false);
                });
        }
    }

    return (
        <div className="comment-post">
            <UserTag user={user} />
            <form className="card-base comment-form">
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
                    <button className="comment-form__submit" onClick={handleSubmit} disabled={isPosting}>Comment</button>
                </div>
            </form>
        </div>
    )
}