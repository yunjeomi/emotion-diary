import React, { useEffect, useReducer } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary";
import Edit from "./pages/Edit";

export interface Data {
  id: string;
  content: string;
  emotion: number;
  date: number;
}

type Init_action = {
  type: "INIT";
  data: Data[];
};

type Create_action = {
  type: "CREATE";
  data: Data;
};

type Remove_action = {
  type: "REMOVE";
  targetId: string;
};

type Edit_action = {
  type: "EDIT";
  targetId: string;
  data: Data;
};

type ActionType = Init_action | Create_action | Remove_action | Edit_action;

const reducer = (state: Data[], action: ActionType) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((item: Data) => item.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((item: Data) =>
        item.id === action.targetId ? { ...action.data } : item
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext<Data[] | undefined>(
  undefined
);

type DispatchType = {
  onCreate: (date: number, content: string, emotion: number) => void;
  onRemove: (targetId: string) => void;
  onEdit: (
    targetId: string,
    content: string,
    emotion: number,
    date: number
  ) => void;
};
export const DiaryDispatchContext = React.createContext<
  DispatchType | undefined
>(undefined);

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  //CREATE
  const onCreate = (date: number, content: string, emotion: number) => {
    dispatch({
      type: "CREATE",
      data: {
        id: uuidv4(),
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  //REMOVE
  const onRemove = (targetId: string) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit = (
    targetId: string,
    content: string,
    emotion: number,
    date: number
  ) => {
    dispatch({
      type: "EDIT",
      targetId,
      data: {
        id: targetId,
        content,
        emotion,
        date: new Date(date).getTime(),
      },
    });
  };

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a: Data, b: Data) => a.date - b.date
      );

      if(diaryList.length > 0) {
        dispatch({ type: "INIT", data: diaryList });
      }
    }
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{ onCreate, onEdit, onRemove }}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
