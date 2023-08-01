const Playlist = require('../models/playlist');

module.exports = {
    create,
    deleteLike
}

async function create(req, res) {
    try {
        const post = await Playlist.findById(req.params.id);
        post.likes.push({username: req.user.username, userId: req.user._id})
        await post.save()
        res.status(201).json({data: 'Liked'})
    } catch(err) {
        res.status(400).json({error: err})
    }
}

async function deleteLike(req, res){
    try {
        const post = await Playlist.findOne({'likes._id': req.params.id, 'likes.username': req.user.username});
        post.likes.remove(req.params.id)
        await post.save() 
        res.json({data: 'Unliked'})
    } catch(err){
        res.status(400).json({error: err})
    }
}