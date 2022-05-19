import React from "react";
import Table from "react-bootstrap/Table";
import DeleteModal from "./DeleteModal";
// needed to link to the edit form
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// pass translations as a named prop to ensure it is passed as an array
// set an attribute translations = {translations} in component tag in app.js
const AdminTable = ({
  tags,
  translations,
  deleteTranslation,
  SubmitForm,
  newTranslation,
  submitTranslation,
  setNewTranslation,
  // props passed on to delete modal
}) => {
  return (
    // Bootrap layout styles
    <Row
      className="justify-content-center  d-flex
          flex-row-reverse"
      xs="12"
      md="12"
      lg="12"
    >
      <Col xs="9" sm="8" md="6" lg="4" xl="4">
        <SubmitForm
          tags={tags}
          newTranslation={newTranslation}
          submitTranslation={submitTranslation}
          setNewTranslation={setNewTranslation}
        />
      </Col>
      <Col md="12" lg="8" xl="8">
        <div className="col-sm-12">
          <Table
            // Bootstrap display styles
            borderless
            size="m"
            className="table admin-table table-striped   "
          >
            <thead className="thead-blue text-light text-center bg-primary bg-gradient fs-4">
              <tr>
                <th>English</th>
                <th>Finnish</th>
                {/* inline styles to set column widths - column widths set by th width */}
                <th style={{ width: "25%" }}>Tag</th>
                <th style={{ width: "15%", minWidth: "15%", maxWidth: "15%" }}>
                  Edit
                </th>
              </tr>
            </thead>
            {/* map data values into the table columns */}
            <tbody className="text-center fs-5">
              {translations.map((translation) => (
                <tr key={translation.id}>
                  <td>{translation.english}</td>
                  <td>{translation.finnish}</td>
                  <td>{translation.tag_id}</td>
                  <td className="text-center">
                    {/* Deletion form in a modal window 
                    pass translsation object and deleteTranslation as props to the modal */}
                    <DeleteModal
                      translation={translation}
                      deleteTranslation={deleteTranslation}
                    />
                    {/* edit form is routed in the url 
                    consider changing to a modal in a future release */}
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
      </Col>
    </Row>
  );
};

export default AdminTable;
