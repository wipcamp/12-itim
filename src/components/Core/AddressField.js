import React from 'react'
import PropTypes from 'prop-types'

import InputAddress from 'react-thailand-address-autocomplete'

const AddressField = (props) => {
  return (

    <label className={props.className} htmlFor={props.name} >
      <div className="row">
        <div className={props.leftSide}>{props.labelInput}</div>
        <div className={props.rightSide}>
          <InputAddress
            className="form-control"
            address={props.address}
            id={props.name}
            value={props.value}
            onChange={props.onChange}
            onSelect={props.onSelect}
            placeholder={props.placeholder}
            name={props.name}
          />
        </div>
      </div>
    </label>
  )
}

AddressField.propsType = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  leftSide: PropTypes.string,
  labelInput: PropTypes.string.isRequired,
  rightSide: PropTypes.string,
  address: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired
}

export default AddressField
