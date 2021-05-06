import React from 'react'
// import './Table.css'

class Table extends React.Component {
  constructor() {
    super()
    this.state = {
      ticketsInfo: [
        {"Ticket id": null, "Status": null, "Subject": null, "Requested": null},
        {"Ticket id": 1, "Status": 1, "Subject": 1, "Requested": 1}
      ]
    }
  }

  async componentDidMount() {
    try {
      await fetch("http://localhost:9292").then(res => res.json()).then(res => {
        console.log(res.tickets[21]) // api json 
        res.tickets.forEach(ticket => {
          this.setState({ticketsInfo: [...this.state.ticketsInfo, ticket]}) 
        })
      })
      this.setState({ticketsInfo: this.state.ticketsInfo.slice(1)}) // remove first empty line in table, shift() will mutate
      console.log(this.state.ticketsInfo.length)
      console.log(this.state.ticketsInfo[3])

    } catch (ex) {
      // to error page
    }

    // const fetchTickets = async () => {      
    //   await fetch("http://localhost:9292").then(res => res.json()).then(res => {
    //     console.log(res.tickets[21]) // api json 
    //     res.tickets.forEach(ticket => {
    //       this.setState({ticketsInfo: [...this.state.ticketsInfo, ticket]}) 
    //     })
    //   })
    //   this.setState({ticketsInfo: this.state.ticketsInfo.slice(1)}) // remove first empty line in table, shift() will mutate
    //   console.log(this.state.ticketsInfo.length)
    //   console.log(this.state.ticketsInfo[3])
    // } 
    // fetchTickets()    
  }

  renderTableHeader() {
    let header = Object.keys(this.state.ticketsInfo[0])
    return header.map((key, index) => {
      return <th key={index}>{key}</th>
    })
  }

  renderTableData() {
    return this.state.ticketsInfo.map((ticket, index) => {
      const {"Ticket id":TicketId, Status, Subject, Requested} = ticket //destructuring
      return (
        <tr key={index}>
          <td>{TicketId}</td>
          <td>{Status}</td>
          <td>{Subject}</td>
          <td>{Requested}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
          <table className= "tickets-list">
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