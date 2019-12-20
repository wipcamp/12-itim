import React from 'react'

const ButtonRoute = (props) => {
  return (
    <div className="d-flex col-12 justify-content-between">
      <button> {props.buttonRight} </button>
      <button type="submit"> {props.buttonLeft} </button>
    </div>
  )
}

export default ButtonRoute