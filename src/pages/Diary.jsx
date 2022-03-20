import React from 'react'
import { useParams } from 'react-router-dom'

const Diary = () => {

  const {id} = useParams();

  return (
    <>
    <div>{id}번째 Diary</div>
    </>
  )
}

export default Diary