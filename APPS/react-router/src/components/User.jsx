import React from 'react'
import { useParams } from 'react-router-dom'

const User = () => {
    const param = useParams()
  return (
    <div>
        I am user {param.username}
    </div>
  )
}

export default User