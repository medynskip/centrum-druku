import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

import ManagerItem from './managerItem';

const ManagerFrame = ({ data, path, setPath, setHistory, goUp }) => {
    const handleClick = (e) => {
        setHistory((prev) => [...prev, e.target.dataset.parent]);
        setPath({
            currentPath: e.target.dataset.path,
        });
    };

    return (
        <div className="manager-view">
            <div className="items-group">
                <a onClick={path !== "public" ? goUp : null}>
                    <div className={path != "public" ? "file-item control" : "file-item control inactive"}>
                        <img src="/images/folder-up.png" /><br />
                        WSTECZ
                    </div>
                </a>
                <div className="items-listed">
                    {data.folders.length > 0 ? 
                    (data.folders.map((item, i) => {
                        return <ManagerItem key={i} item={item} handleClick={handleClick} />
                        })) : (
                            <div className="empty-list">BRAK FOLDERÓW</div>
                        )
}
                </div>
                <a onClick={null}>
                    <div className="file-item control">
                        <img src="/images/add-folder.png" /><br />
                        DODAJ FOLDER
                    </div>
                </a>
            </div>
            <hr />
            <div className="items-group">
            <a onClick={goUp}>
                    <div className="file-item control">
                        <img src="/images/add-file.png" /><br />
            DODAJ PLIKI
          </div>
                </a>
            <div className="items-listed">
                {data.files.map((item, i) => {
                    return <ManagerItem key={i} item={item} handleClick={handleClick} />

                })}
                </div>
            </div>
        </div>
    );
};

export default ManagerFrame;