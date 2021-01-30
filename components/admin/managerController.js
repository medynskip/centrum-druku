import { useState, useEffect } from "react";

import ManagerFrame from "./managerFrame";

import Container from "react-bootstrap/Container";

const ManagerController = ({ handleSelected }) => {
  const [data, setData] = useState([]);
  const [counter, setLog] = useState([]);
  const [state, setState] = useState({
    currentPath: "public",
  });
  const [history, setHistory] = useState([]);

  useEffect(() => {
    updateData();
    console.log("reloaded");
  }, [counter]);

  const updateData = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/file/show`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((jsonResp) => {
        setData(jsonResp);
      });
  };

  const setPath = (params) => {
    setState({
      ...params,
    });
    setLog((prev) => [...prev, 1]);
  };

  const goUp = () => {
    const item = history.pop();
    setState({
      currentPath: item,
    });
    setLog((prev) => [...prev, 1]);
  };

  if (data.length < 1) return <div>loading...</div>;

  return (
    <div className="file-manager">
      <div className="current-path">
        <span>Folder: </span>
        {state.currentPath}
      </div>
      <ManagerFrame
        setLog={setLog}
        data={data}
        path={state.currentPath}
        setPath={setPath}
        setHistory={setHistory}
        goUp={goUp}
        handleSelected={handleSelected}
      />
    </div>
  );
};

export default ManagerController;
