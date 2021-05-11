import React from 'react'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'

class Details extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const { match, history } = this.props
    const ticketId = match.params.id

    fetch(`http://localhost:9292/list/${ticketId}`).then(res => res.json()).then(res => {
      if (!("error" in res)) {
        this.setState({ ticket: res.ticket })
      } else {
        this.setState({ errorMessage: res.error })
      }
    }).catch(err => history.push('/error'))
  }

  render() {
    if (!this.state.ticket) {
      if (this.state.errorMessage) {
        return <div>{this.state.errorMessage}</div>
      }
      return <div>Loading...</div>
    }

    const { subject, status, requester, requested, description } = this.state.ticket
    return (
      <div>
        <h3>Subject: {subject}</h3>
        <p>Requester: {requester}</p>
        <p>{moment(requested).format('YYYY-MM-DD HH:MM')}</p>
        <p>Description: {description}</p>
        <Link to="/tickets">Back to All Tickets</Link>
      </div>
    )
  }
}

export default withRouter(Details);