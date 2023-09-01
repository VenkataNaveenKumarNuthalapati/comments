import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  //   console.log(props)
  const {eachComment, likeStatusChange, onDelete} = props

  const {id, name, comment, date, isLiked, firstCharClass} = eachComment
  const time = formatDistanceToNow(date)
  const likeClass = isLiked ? 'likeSpan' : 'Span'

  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <li className="comment-container">
      <div className="comment-top-container">
        <div className={firstCharClass}>
          <span>{name[0]}</span>
        </div>
        <p>{name}</p>
        <p>{time}</p>
      </div>
      <p>{comment}</p>
      <div className="comment-bottom-container">
        <button type="button" onClick={() => likeStatusChange(id)}>
          <img src={likeImage} alt="like" />
          <span className={likeClass}>Like</span>
        </button>
        <button type="button" data-testid="delete" onClick={() => onDelete(id)}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
