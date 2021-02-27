const { Schema } = require('mongoose');

const dbConnection = require('../repositories/mongodb/dbClient');

const LinkSchema = new Schema(
  {
    orinalURL: { type: String, required: true },
    hash: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

LinkSchema.index({ hash: 1 });

module.exports = dbConnection.model('link', LinkSchema);
