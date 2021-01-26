import React, { useState } from "react";

import ManagerItem from "./managerItem";
import ManagerUpload from "./managerUpload";

const ManagerFrame = ({
  data,
  path,
  setPath,
  setLog,
  setHistory,
  goUp,
  handleSelected,
}) => {
  const [show, setShow] = useState(false);

  const handleFolder = (e) => {
    setHistory((prev) => [...prev, e.target.dataset.parent]);
    setPath({
      currentPath: e.target.dataset.path,
    });
    setLog((prev) => [...prev, 1]);
  };

  const handleFile = (e) => {
    handleSelected(e.target.dataset.path);
    // setLog((prev) => [...prev, 1]);
  };

  const createFolder = () => {
    const data = {
      currentPath: path,
      newDirectory: prompt("Podaj nazwę folderu"),
    };
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/file/mkdir`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((jsonResp) => {
        setLog((prev) => [...prev, 1]);
      });
  };

  const uploadFiles = (data) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/file/upload`, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setLog((prev) => [...prev, 1]);
      });
  };

  return (
    <div className="manager-view">
      <div className="items-group">
        <div
          onClick={path !== "public" ? goUp : null}
          className={
            path != "public"
              ? "file-item control"
              : "file-item control inactive"
          }
        >
          <img src="/images/folder-up.png" />
          <br />
          WSTECZ
        </div>

        {data.folders.length > 0 ? (
          data.folders.map((item, i) => {
            return (
              <ManagerItem
                key={i}
                item={item}
                handleFolder={handleFolder}
                handleFile={handleFile}
              />
            );
          })
        ) : (
          <div className="empty-list">BRAK FOLDERÓW</div>
        )}

        <a onClick={createFolder}>
          <div className="file-item control">
            <img src="/images/add-folder.png" />
            <br />
            DODAJ FOLDER
          </div>
        </a>
      </div>
      <hr />
      <div className="items-group">
        {data.files.map((item, i) => {
          return (
            <ManagerItem
              key={i}
              item={item}
              handleFolder={handleFolder}
              handleFile={handleFile}
            />
          );
        })}

        <div onClick={() => setShow(true)} className="file-item control">
          <img src="/images/add-file.png" />
          <br />
          DODAJ PLIKI
        </div>
      </div>
      <ManagerUpload
        setShow={setShow}
        show={show}
        path={path}
        uploadFiles={uploadFiles}
      />
    </div>
  );
};

export default ManagerFrame;
