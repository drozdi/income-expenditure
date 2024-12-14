const mongoose = require('mongoose');
const validator = require('validator');

const SourceSchema = mongoose.Schema(
	{
		label: { type: String, required: true },
		total: { type: Number, required: true, default: 0 },
		owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true },
);

const Source = mongoose.model('Source', SourceSchema);

module.exports = Source;
