import { useRouter } from "next/router";

import React, { useState, useEffect } from "react";

import AdminLayout from "./../../../components/admin/adminLayout";
import OrderRow from "./../../../components/admin/orderRow";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

const FileWindow = ({ data, setPath, goUp }) => {
  const handleClick = (e) => {
    setPath({
      parentPath: e.target.dataset.parent,
      currentPath: e.target.dataset.path,
    });
  };

  // const goUp = (e) => {
  //   console.log(e.target.dataset.path);
  //   setPath({
  //     currentPath: e.target.dataset.path,
  //   });
  // };

  return (
    <div className="manager-view">
      <div className="folders-group">
        <a onClick={goUp}>
          <div className="file-item" data-path={`${data[0].parent}`}>
            <img src="/images/folder.png" data-path={`${data[0].parent}`} />
            GO UP
          </div>
        </a>
        {data.map((item) => {
          if (item.type == "directory") {
            return (
              <a onClick={handleClick}>
                <div
                  className="file-item"
                  data-path={`${item.path}/${item.name}/`}
                  data-parent={`${item.path}/`}
                >
                  <img
                    data-path={`${item.path}/${item.name}`}
                    data-parent={`${item.path}/`}
                    src={
                      item.type == "directory"
                        ? "/images/folder.png"
                        : "/images/jpg.png"
                    }
                  />
                  name: {item.name}
                  <br />
                  parent: {item.parent}
                  <br />
                  path: {item.path}
                </div>
              </a>
            );
          }
        })}
      </div>
      <hr />
      <div className="files-group">
        {data.map((item) => {
          if (item.type == "file") {
            return (
              <div className="file-item">
                <img
                  src={
                    item.type == "directory"
                      ? "/images/folder.png"
                      : "/images/jpg.png"
                  }
                />
                {item.name}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

const FileManager = () => {
  const [data, setData] = useState([]);
  const [state, setState] = useState({
    parentPath: "/public",
    currentPath: "/public",
  });

  const updateData = () => {
    fetch("http://localhost:5001/file/show", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => res.json())
      .then((dats) => {
        setData(dats);
      });
  };

  useEffect(() => {
    updateData();
  }, [state.currentPath]);

  const setPath = (params) => {
    setState({
      // ...state,
      parentPath: state.currentPath,
      ...params,
    });
  };

  const goUp = () => {
    setState({
      ...state,
      currentPath: state.parentPath,
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
          <FileWindow data={data} setPath={setPath} goUp={goUp} />
        </div>
      </Container>
    </AdminLayout>
  );
};

export default FileManager;
