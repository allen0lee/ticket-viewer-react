import React from 'react'
import { Link, withRouter } from 'react-router-dom';
// import './Table.css'

const initialState = {
  unsolvedTickets: 0,
  ticketsInfo: [
    { id: null, status: null, subject: null, requested: null }
  ],
  pageNumbers: []
}

class Table extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  resetState() {
    this.setState(initialState)
  }

  async componentDidMount() {
    const { match, history } = this.props;

    await fetch("http://localhost:9292").then(res => res.json()).then(res => {
      res.tickets.forEach(ticket => {
        this.setState({ ticketsInfo: [...this.state.ticketsInfo, ticket] })
      })

      for (let i = 1; i <= res.pages; i++) {
        this.setState({ pageNumbers: [...this.state.pageNumbers, i] })
      }
    }).catch((e) => history.push('/error'))

    this.setState({ ticketsInfo: this.state.ticketsInfo.slice(1) }) // remove first empty line in table, shift() will mutate

  }

  async switchTablePage(pageNumber) {
    this.resetState()
    try {
      await fetch(`http://localhost:9292/list/pages/${pageNumber}`).then(res => res.json()).then(res => {
        res.tickets.forEach(ticket => {
          this.setState({ ticketsInfo: [...this.state.ticketsInfo, ticket] })
        })

        for (let i = 1; i <= res.pages; i++) {
          this.setState({ pageNumbers: [...this.state.pageNumbers, i] })
        }
      })
      this.setState({ ticketsInfo: this.state.ticketsInfo.slice(1) }) // remove first empty line in table, shift() will mutate

    } catch (ex) {
      // to error page
    }
  }

  toDetailsPage() {

  }

  renderTableHeader() {
    let header = Object.keys(this.state.ticketsInfo[0])
    return header.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  renderTableData() {
    return this.state.ticketsInfo.map((ticket, index) => {
      const { id, status, subject, requested } = ticket //destructuring
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{status}</td>
          <td>
            <Link to={`/tickets/${id}`}>{subject}</Link>
          </td>
          <td>{requested}</td>
        </tr>
      )
    })
  }

  renderPageNumbers() {
    return this.state.pageNumbers.map((page, index) => {
      return (
        <a key={index} onClick={() => this.switchTablePage(page)}>{page}</a>
      )
    })
  }

  render() {
    return (
      <div>
        <table className="tickets-list">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
        {this.renderPageNumbers()}
      </div>
    )
  }
}

export default withRouter(Table);