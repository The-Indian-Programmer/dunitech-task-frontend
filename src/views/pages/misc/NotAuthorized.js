import React from 'react'
import { Button } from 'reactstrap'

const NotAuthorized = () => {
  return (
    <div className='d-flex align-items-center'>
      NotAuthorized To View This Page 

      <Button color='primary' onClick={() => window.location.href = '/'}>Go Back</Button>
    </div>
  )
}

export default NotAuthorized
