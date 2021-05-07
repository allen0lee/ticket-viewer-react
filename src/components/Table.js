import React from 'react'
// import './Table.css'

class Table extends React.Component {
  constructor() {
    super()
    this.state = {
      unsolvedTickets: 0,
      ticketsInfo: [
        {status: null, subject: null, requested: null}
      ],
      pageNumbers: []
    }
  }

  async componentDidMount() {
    try {
      await fetch("http://localhost:9292").then(res => res.json()).then(res => {
        res.tickets.forEach(ticket => {
          this.setState({ticketsInfo: [...this.state.ticketsInfo, ticket]}) 
        })

        for(let i = 1; i <= res.pages; i++) {
          this.setState({pageNumbers: [...this.state.pageNumbers, i]})
        }
      })
      this.setState({ticketsInfo: this.state.ticketsInfo.slice(1)}) // remove first empty line in table, shift() will mutate

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
      const {status, subject, requested} = ticket //destructuring
      return (
        <tr key={index}>
          <td>{status}</td>
          <td>{subject}</td>
          <td>{requested}</td>
        </tr>
      )
    })
  }

  renderPageNumbers() {
    return this.state.pageNumbers.map((page, index) => {
      return (
        <a key={index}>{page}</a>
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
          {this.renderPageNumbers()}
      </div>
    )
  }
}

export default Table;