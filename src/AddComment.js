import React from 'react'

class AddComment extends React.Component {
  state = {
    text: '',
    date: '',
    author: {
      firstName: '',
      lastName: '',
      avatarURL: 'https://www.europe-together.eu/wp-content/themes/sd/images/user-placeholder.svg'
    }
  }

  updateData = (e) => {
    const { name, value } = e.target
    if(name.includes('Name')) {
      this.setState({ author: { ...this.state.author, [name]: value }, date: new Date() })
    } else { this.setState({ [name]: value, date: new Date() }) }
  }

  addComment = (e) => {
    e.preventDefault()
    this.props.addComment(this.state)
    this.setState({
      text: '',
      date: '',
      author: {
        firstName: '',
        lastName: '',
        avatarURL: 'https://www.europe-together.eu/wp-content/themes/sd/images/user-placeholder.svg'
      }
    })
  }

  render() {
    return (
      <>
        <h2>Add Comment</h2>
        <form method="post" onSubmit={this.addComment}>
          <input type="text" name="firstName" value={this.state.author.firstName} onChange={this.updateData} placeholder="First Name" required />
          <input type="text" name="lastName" value={this.state.author.lastName} onChange={this.updateData} placeholder="Last Name" required />
          <textarea name="text" value={this.state.text} onChange={this.updateData} placeholder="Your Comment" required />
          <button type="submit">
            Add
          </button>
        </form>
      </>
    )
  }
}

export default AddComment