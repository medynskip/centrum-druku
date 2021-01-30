import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";

import AdminLayout from "./../../../components/admin/adminLayout";
import ManagerController from "../../../components/admin/managerController";

const FileManager = () => {
  const [selected, setSelected] = useState("");

  const handleSelected = (item) => {
    setSelected(item);
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Pliki</h3>

        <ManagerController handleSelected={handleSelected} />

        <div className="selected-file">
          <span>Ścieżka pliku:</span>{" "}
          {selected == "" ? "Nie zaznaczono" : selected}
        </div>
      </Container>
    </AdminLayout>
  );
};

export default FileManager;
