import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";


import AdminLayout from "./../../../components/admin/adminLayout";
import ManagerFrame from "../../../components/admin/managerFrame";


const FileManager = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    currentPath: "public",
  });

  const [history, setHistory] = useState([]);

  const updateData = () => {
    fetch("http://localhost:5001/file/show", {
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

  useEffect(() => {
    updateData();
  }, [state.currentPath]);

  const setPath = (params) => {
    setState({
      ...params,
    });
  };

  const goUp = () => {
    const item = history.pop()
    setState({
      ...state,
      currentPath: item,
    });
  };

  // if (error) return <div>failed to load</div>;
  if (data.length < 1) return <div>loading...</div>;

  return (
    <AdminLayout>
      <Container>
        <h3>Pliki</h3>
        <div className="file-manager">
          <div className="current-path">{state.currentPath}</div>
          <ManagerFrame data={data} path={state.currentPath} setPath={setPath} setHistory={setHistory} goUp={goUp} />
        </div>
      </Container>
    </AdminLayout>
  );
};

export default FileManager;
