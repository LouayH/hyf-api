import React from 'react'
import AddComment from './AddComment'
import Comment from './Comment'

class App extends React.Component {
  state = {
    post: {
      title: 'What is Lorem Ipsum?',
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    comments: []
  }

  async componentDidMount() {
    const comments = await fetch('https://hyf-react-api.herokuapp.com/blog/comments')
    .then(function(response) { return response.json() })
    .then(function(json) { return json });

    this.setState({ comments: comments })
  }

  addComment = (data) => {
    return fetch(`https://hyf-react-api.herokuapp.com/blog/comments/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      const comments = this.state.comments
      this.setState({ comments: [ ...comments, json ] })
    })
  }

  updateComment = (i, data) => {
    const id = this.state.comments[i]._id
    return fetch(`https://hyf-react-api.herokuapp.com/blog/comments/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => {
      const comments = this.state.comments
      comments[i] = json

      this.setState({ comments: comments })
    })
  }

  deleteComment = (i) => {
    const id = this.state.comments[i]._id
    return fetch(`https://hyf-react-api.herokuapp.com/blog/comments/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      const comments = this.state.comments
      comments.splice(i, 1)
      this.setState({ comments: comments })
    })
  }

  render() {
    return (
      <section>
        <article>
          <h1> {this.state.post.title} </h1>
          <p> {this.state.post.content} </p>
          <AddComment addComment={this.addComment} />
        </article>
        <ul>
          <h2>Comments</h2>
          { this.state.comments.map((comment, cIndex) => (
            <Comment key={cIndex} index={cIndex} data={comment} updateComment={this.updateComment} deleteComment={this.deleteComment} />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
