import {Component} from 'react'
import {v4} from 'uuid'
// import {formatDistanceToNow} from 'date-fns'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here

class Comments extends Component {
  state = {name: '', comment: '', commentsList: []}

  addInputName = event => {
    this.setState({name: event.target.value})
  }

  addInputComment = event => {
    this.setState({comment: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const firstCharClass = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`
    const commentObj = {
      id: v4(),
      name,
      comment,
      isLiked: false,
      date: new Date(),
      firstCharClass,
    }
    // if (commentObj.name !== '' && commentObj.comment !== '') {
    this.setState(preState => ({
      name: '',
      comment: '',
      commentsList: [...preState.commentsList, commentObj],
    }))
    // }
  }

  likeStatusChange = id => {
    const {commentsList} = this.state
    function isContain(eachObj) {
      return eachObj.id === id
        ? {...eachObj, isLiked: !eachObj.isLiked}
        : eachObj
    }
    const modifiedCommentsList = commentsList.map(eachObj => isContain(eachObj))

    this.setState(preState => ({
      ...preState,
      commentsList: modifiedCommentsList,
    }))
  }

  onDelete = id => {
    const {commentsList} = this.state
    const updatedCommentsList = commentsList.filter(obj => obj.id !== id)

    this.setState({commentsList: updatedCommentsList})
  }

  renderCommentsList = () => {
    const {commentsList} = this.state

    return commentsList.map(eachComment => (
      <CommentItem
        eachComment={eachComment}
        key={eachComment.id}
        likeStatusChange={this.likeStatusChange}
        onDelete={this.onDelete}
      />
    ))
  }

  render() {
    const {name, comment, commentsList} = this.state
    return (
      <div className="bg-container">
        <h1>Comments</h1>
        <div className="top-container">
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <p>Say something about 4.0 technoloiges</p>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={this.addInputName}
            />
            <textarea
              rows="10"
              cols=""
              value={comment}
              placeholder="Your Comment"
              onChange={this.addInputComment}
            />
            <button type="submit">Add Comment</button>
          </form>
          <div className="image-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>

        <div>
          <span className="comment-count">{commentsList.length}</span> Comments
        </div>
        <ul className="list-container">{this.renderCommentsList()}</ul>
      </div>
    )
  }
}
export default Comments
