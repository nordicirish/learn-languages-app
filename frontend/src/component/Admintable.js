import React from "react";
// pass translations as a named prop to ensure it is passed as an array
// set an attribute translations = {translations} in component tag in app.js
const AdminTable = ({ translations }) => {
  return (
    <table className="admin-table">
      <thead>
        <tr>
          <th>English</th>
          <th>Finnish</th>
          <th>Tag</th>
        </tr>
      </thead>
      <tbody>
        {translations.map((translation) => (
          <tr key={translation.id}>
            <td>{translation.english}</td>
            <td>{translation.finnish}</td>
            <td>{translation.tag_id}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
