import React from "react";
// redundant component functionality handle by Admin table
const Translation = ({ translation }) => {
  return (
    <li>
      <b>English: </b> {translation.english} <b>Finnish: </b>
      {translation.finnish} <b>Tag: </b>
      {translation.tag_id}
    </li>
  );
};

export default Translation;
