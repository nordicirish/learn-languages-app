import React from "react";

const Translation = ({ translation }) => {
  return (
    <li>
      <b>English: </b> {translation.english} <b>Finnish: </b>
      {translation.finnish} <b>Tag: </b>
      {translation.category}
    </li>
  );
};

export default Translation;
