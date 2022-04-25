module.exports = {
  type: "object",
  properties: {
    english: { type: "string" },
    finnish: { type: "string" },
    tag_id: { type: "string" },
  },
  required: ["english", "finnish", "tag_id"],
};
