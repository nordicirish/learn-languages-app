module.exports = {
  type: "object",
  properties: {
    english: { type: "string" },
    finnish: { type: "string" },
    tag_id: { type: "number" },
  },
  required: ["english", "finnish", "tag_id"],
};
