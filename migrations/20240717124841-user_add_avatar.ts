module.exports = {
  async up(db) {
    await db.collection("users").updateMany({}, { $set: { avatar: null } })
  },

  async down(db) {
    await db.collection("users").updateMany({}, { $unset: { avatar: "" } })
  },
}
