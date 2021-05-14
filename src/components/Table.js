import React from 'react'
import moment from 'moment'
import { Link, withRouter } from 'react-router-dom'
import makeReqToApi from '../lib/makeReqToApi.js'
import '../css/Table.css'

const initialState = {
  numOfTickets: 0,
  ticketsInfo: [
    { id: null, status: null, subject: null, requested: null }
  ],
  pageNumbers: [],
  errorMessage: null
}

class Table extends React.Component {
  constructor() {
    super()
    this.state = initialState
  }

  resetState() {
    this.setState(initialState)
  }

  componentDidMount() {
    const { history } = this.props
    const url = "http://localhost:9292"

    makeReqToApi(url).then(res => {
      if ("tickets" in res) {
        this.setState({ numOfTickets: res.count })
        res.tickets.forEach(ticket => {
          this.setState({ ticketsInfo: [...this.state.ticketsInfo, ticket] })
        })
        // remove first empty line in table, shift() will mutate
        this.setState({ ticketsInfo: this.state.ticketsInfo.slice(1) })
        for (let i = 1; i <= res.pages; i++) {
          this.setState({ pageNumbers: [...this.state.pageNumbers, i] })
        }
      } else if ("error" in res) {
        this.setState({ errorMessage: res.error })
      }
    }).catch(err => {
      history.push('/error') // when req is blocked or network error
    })
  }

  switchTablePage(pageNumber) {
    this.resetState()
    const { history } = this.props
    const url = `http://localhost:9292/tickets_list/page/${pageNumber}`

    makeReqToApi(url).then(res => {
      if ("tickets" in res) {
        this.setState({ numOfTickets: res.count })
        res.tickets.forEach(ticket => {
          this.setState({ ticketsInfo: [...this.state.ticketsInfo, ticket] })
        })
        this.setState({ ticketsInfo: this.state.ticketsInfo.slice(1) })
        for (let i = 1; i <= res.pages; i++) {
          this.setState({ pageNumbers: [...this.state.pageNumbers, i] })
        }
      } else if ("error" in res) {
        this.setState({ errorMessage: res.error })
      }
    }).catch(err => {
      history.push('/error')
    })
  }

  renderTableHeader() {
    let header = Object.keys(this.state.ticketsInfo[0])
    return header.map((key, index) => {
      return <th key={index}>{key[0].toUpperCase() + key.substring(1)}</th>
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
            <Link to={`/ticket/${id}`}>{subject}</Link>
          </td>
          <td>{moment(requested).format('YYYY-MM-DD HH:MM')}</td>
        </tr>
      )
    })
  }

  renderPageNumbers() {
    return this.state.pageNumbers.map((page, index) => {
      return (
        <a className="page-number" key={index} onClick={() => this.switchTablePage(page)}>{page} </a>
      )
    })
  }

  render() {
    if (this.state.pageNumbers.length === 0) {
      if (this.state.errorMessage !== null) {
        return <div>Error: {this.state.errorMessage}</div>
      }
      return <div>Loading...</div>
    }
    return (
      <div>
        <h3>Your unsolved tickets</h3>
        <p>{this.state.numOfTickets} tickets</p>
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

export default withRouter(Table)