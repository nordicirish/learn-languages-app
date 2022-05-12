import React from "react";
import Table from "react-bootstrap/Table";
import DeleteModal from "./DeleteModal";
import { Link } from "react-router-dom";

// pass translations as a named prop to ensure it is passed as an array
// set an attribute translations = {translations} in component tag in app.js
const AdminTable = ({ tags, translations, deleteTranslation }) => {
  return (
    <div className="col-sm-12">
      <Table borderless size="m" className="table admin-table table-striped   ">
        <thead className="thead-dark thead-blue">
          <tr>
            <th>English</th>
            <th>Finnish</th>
            <th style={{ width: "25%" }}>Tag</th>
            <th style={{ width: "14%", minWidth: "14%", maxWidth: "14%" }}>
              Edit
            </th>
          </tr>
        </thead>
        <tbody>
          {translations.map((translation) => (
            <tr key={translation.id}>
              <td>{translation.english}</td>
              <td>{translation.finnish}</td>
              <td>{translation.tag_id}</td>
              <td className="text-center">
                <DeleteModal
                  translation={translation}
                  deleteTranslation={deleteTranslation}
                />

                <Link
                  className=" mr-2"
                  to={`/translations/edit/${translation.id}`}
                >
                  <i className="fa fa-edit" aria-hidden="true"></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminTable;
