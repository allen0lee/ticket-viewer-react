import React from 'react'
// import './Table.css'

class Table extends React.Component {
  constructor() {
    super()
    this.state = {
      tickets: [
        {"Status": 1, "Subject": 1, "Requester": 1, "Requested": 1}
      ],
      pages: []
    }
  }

  componentDidMount() {
  
  }

  renderTableHeader() {
    let header = Object.keys(this.state.tickets[0])
    return header.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  renderTableData() {
    return this.state.tickets.map((ticket, index) => {
      const {Status, Subject, Requester, Requested} = ticket //destructuring
      return (
        <tr key={ticket}>
          <td>{Status}</td>
          <td>{Subject}</td>
          <td>{Requester}</td>
          <td>{Requested}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
          <table class="tickets-list">
            <tbody>
              <tr>{this.renderTableHeader()}</tr>
              {this.renderTableData()}
            </tbody>
          </table>
      </div>
    )
  }
}

export default Table;