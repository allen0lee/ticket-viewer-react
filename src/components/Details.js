import React from 'react'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import makeReqToApi from '../lib/makeReqToApi.js'

class Details extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const { match, history } = this.props
    const ticketId = match.params.id
    const url = `http://localhost:9292/ticket/${ticketId}`

    makeReqToApi(url).then(res => {
      if ("ticket" in res) {
        this.setState({ ticket: res.ticket })
      } else if ("error" in res) {
        this.setState({ errorMessage: res.error })
      }
    }).catch(err => {
      history.push('/error') // when req is blocked or network error
    })
  }

  render() {
    if (!("ticket" in this.state)) {
      if ("errorMessage" in this.state) {
        return <div>{this.state.errorMessage}</div>
      }
      return <div>Loading...</div>
    }

    const { subject, requester, requested, description } = this.state.ticket
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

export default withRouter(Details)