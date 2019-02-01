import React from 'react'
import moment from 'moment'

class Comment extends React.Component {
  state = {
    text: this.props.data.text,
    isLiked: this.props.data.isLiked,
    editMode: false
  }

  toggleEditMode = () => {
    this.setState({ editMode: !this.state.editMode })
  }

  editText = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  updateText = () => {
    if(this.state.text === '') {
      alert('Comment text cannot be empty')
    } else {
      this.props.updateComment(this.props.index, { text: this.state.text } )
      this.toggleEditMode()
    }
  }

  toggleLike = async () => {
    await this.setState({ isLiked: !this.state.isLiked })
    this.props.updateComment(this.props.index, { isLiked: this.state.isLiked } )
  }

  render() {
    return (
      <li>
        <header>
          <img src={ this.props.data.author.avatarURL || 'https://www.europe-together.eu/wp-content/themes/sd/images/user-placeholder.svg' } alt={ `${this.props.data.author.firstName} ${this.props.data.author.lastName}` } />
          <div>
            <h3> { `${this.props.data.author.firstName} ${this.props.data.author.lastName}` } </h3>
            <small> { moment(this.props.data.date).fromNow() } </small>
          </div>
          <button className={ this.props.data.isLiked ? 'liked' : undefined } onClick={this.toggleLike}>
            { this.props.data.isLiked ? '♥' : '♡' }
          </button>
        </header>
        <p>
          { this.state.editMode ?
            <input type="text" name="text" value={this.state.text} onChange={this.editText} /> :
            this.props.data.text
          }
        </p>
        <footer>
          { this.state.editMode ?
            <>
              <button onClick={this.updateText}>Update</button>
              <button onClick={this.toggleEditMode}>Cancel</button>
            </> :
            <button onClick={this.toggleEditMode}>Edit</button>
          }
          <button onClick={() => this.props.deleteComment(this.props.index)}>Delete</button>
        </footer>
      </li>
    )
  }
}

export default Comment