import React from 'react'
import moment from 'moment';
import { Link, withRouter } from 'react-router-dom';

class Details extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const { match, history } = this.props;
    const ticketId = match.params.id;


    fetch(`http://localhost:9292/list/${ticketId}`).then(res => res.json()).then(res => {
      this.setState({ ticket: res.ticket })
    }).catch((e) => history.push('/error'))


  }

  render() {
    if (!this.state.ticket) {
      return <div>Loading...</div>
    }
    const { subject, status, requester, requested, description } = this.state.ticket;
    return (
      <div>
        <h1>{subject}</h1>
        <p>{requester}</p>
        <p>{moment(requested).format('YYYY-MM-DD HH:MM:SS')}</p>
        <p>{description}</p>
        <Link to="/tickets">Return to Tickets</Link>
      </div>
    )
  }
}

export default withRouter(Details);