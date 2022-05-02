import React from "react";
import Table from "react-bootstrap/Table";

// pass translations as a named prop to ensure it is passed as an array
// set an attribute translations = {translations} in component tag in app.js
const AdminTable = ({ translations }) => {
  return (
    <Table
      striped
      bordered
      hover
      variant="primary dark"
      className="admin-table table-dark"
    >
      <thead className="thead-dark">
        <tr>
          <th>English</th>
          <th>Finnish</th>
          <th>Tag</th>
        </tr>
      </thead>
      <tbody>
        {translations.map((translation) => (
          //add table row id to reference in update and delete operations
          <tr key={translation.id} id={translation.id}>
            <td>{translation.english}</td>
            <td>{translation.finnish}</td>
            <td>{translation.tag_id}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AdminTable;