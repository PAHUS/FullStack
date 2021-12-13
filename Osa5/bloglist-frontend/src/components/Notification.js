import React from 'react'

const Notification = ({ message , ...props}) => {
  if (message === null) {
    return null
  }

  return (
    <div {...props}>
      {message}
    </div>
  )
}

export default Notification