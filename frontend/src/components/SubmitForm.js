import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// props passed from translations.js
const SubmitForm = ({
  tags,
  translation,
  submitTranslation,
  setTranslation,
}) => {
  //  Object Destructuring
  const { english, finnish, tag_id } = translation;
  const onInputChange = (e) => {
    setTranslation({ ...translation, [e.target.id]: e.target.value });
  };
  return (
    <div className="box p-3 mb-3 mt-0" style={{ border: "1px solid #d0d0d0" }}>
      <Form onSubmit={submitTranslation}>
        <h4 className="mb-3 ">Add a translation</h4>
        <Form.Group className="mb-3">
          <Form.Control
            as="input"
            type="text"
            id="english"
            name="english"
            value={english}
            onChange={(e) => onInputChange(e)}
            placeholder="Enter the English word"
            aria-label="Enter the Finnish translation"
            required
            pattern="[a-zA-Z]*"
            title="The word should have only English letters"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            as="input"
            type="text"
            id="finnish"
            name="finnish"
            value={finnish}
            onChange={(e) => onInputChange(e)}
            placeholder="Enter the Finnish translation"
            aria-label="Enter the Finnish translation"
            pattern="[a-zA-ZäöåÄÖÅ]*"
            title="The word should have only letters"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Select
            id="tag_id"
            value={tag_id}
            onChange={(e) => onInputChange(e)}
            aria-label="Please select a tag"
            required
          >
            <option value="">Select a tag</option>
            {tags.map((tag) => (
              <option key={tag.tag} value={tag.tag}>
                {tag.tag}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
};
export default SubmitForm;
