import React from "react";

const AdminTable = (props) => {
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
        {props.translations.map((translation) => (
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
