const Source = require('../models/Source');

async function addSource(source) {
	const newSource = await Source.create(source);

	await newSource.populate({
		path: 'sources',
		populate: 'owner',
	});

	return newSource;
}

// edit
async function updateSource(id, source) {
	const newSource = await Source.findByIdAndUpdate(id, source, {
		returnDocument: 'after',
	});

	await newSource.populate({
		path: 'sources',
		populate: 'owner',
	});

	return newSource;
}

// delete
function deleteSource(id) {
	return Source.deleteOne({ _id: id });
}

// get list with search and pagination
async function getSources(filter) {
	const data = await Source.find(filter);
	data.forEach(
		async (source) =>
			await source.populate({
				path: 'sources',
				populate: 'owner',
			}),
	);
	return data;
}

// get item
function getSource(id) {
	return Source.findById(id).populate({
		path: 'sources',
		populate: 'owner',
	});
}

module.exports = {
	addSource,
	updateSource,
	deleteSource,
	getSources,
	getSource,
};
