import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';

const Edit = () => {

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  const mode = searchParams.get("mode");

  return (
    <>
    <div>Edit {id}, {mode}</div>
    <button onClick={()=>navigate("/home")}>Home으로 가기</button>
    <button onClick={()=>navigate(-1)}>뒤로 가기</button>
    </>
  )
}

export default Edit