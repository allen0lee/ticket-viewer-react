const Error = props => {
  return (
    <div>
      <p>Oops, something goes wrong!</p>
      <p>{props.data}</p>
    </div>
  )
}

export default Error