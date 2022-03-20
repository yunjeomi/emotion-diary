import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";
import { Link } from "react-router-dom";
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText="header"
          leftChild={
            <MyButton text="왼쪽버튼" onClick={() => alert("왼쪽클릭")} />
          }
          rightChild={
            <MyButton text="오른쪽버튼" onClick={() => alert("오른쪽클릭")} />
          }
        />
        <h2>App</h2>

        {/* <img src={process.env.PUBLIC_URL +`/assets/emotion1.png`} />
        <img src={process.env.PUBLIC_URL +`/assets/emotion2.png`} />
        <img src={process.env.PUBLIC_URL +`/assets/emotion3.png`} />
        <img src={process.env.PUBLIC_URL +`/assets/emotion4.png`} />
        <img src={process.env.PUBLIC_URL +`/assets/emotion5.png`} /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>

        <MyButton
          text={"positive btn"}
          onClick={() => alert("click")}
          type={"positive"}
        />
        <MyButton
          text={"negative btn"}
          onClick={() => alert("click")}
          type={"negative"}
        />
        <MyButton text={"default btn"} onClick={() => alert("click")} />
        <br />
        <Link to={"/"}>HOME</Link>
        <br />
        <Link to={"/new"}>NEW</Link>
        <br />
        <Link to={"/edit"}>EDIT</Link>
        <br />
        <Link to={"/diary"}>DIARY</Link>
        <br />
      </div>
    </BrowserRouter>
  );
}

export default App;
