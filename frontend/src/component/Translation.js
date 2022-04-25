import React from "react";

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
