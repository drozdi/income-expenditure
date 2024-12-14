const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User.js');
const Source = require('../models/Source.js');
const router = express.Router({ mergeParams: true });
const auth = require('../middlewares/auth');
const {
	addSource,
	updateSource,
	deleteSource,
	getSources,
	getSource,
} = require('../controllers/source.controller');
router.use(auth);

router.get('/', async (req, res) => {
	const user = await User.find({
		_id: '6755707168b4fed5a811b808',
	});
	console.log(user);
	//console.log(req.user._id);

	//const { } = await getSources();

	res.send({ data: [] });
});

router.get('/:id', async (req, res) => {
	//const post = await getPost(req.params.id);

	res.send({ data: {} });
});

router.post('/', async (req, res) => {
	/*const newPost = await addPost({
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	});*/

	res.send({ data: {} });
});

router.patch('/:id', async (req, res) => {
	/*const updatedPost = await editPost(req.params.id, {
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	});*/

	res.send({ data: {} });
});

router.delete('/:id', async (req, res) => {
	/*await deletePost(req.params.id);*/

	res.send({ error: null });
});

module.exports = router;
