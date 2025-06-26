const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lawyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['pending', 'in progress', 'closed'], default: 'pending' },
  urgency: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
  files: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema); 