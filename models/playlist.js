const mongoose = require('mongoose');

const likesSchema = mongoose.Schema({
    username: String,
    userId: { type: mongoose.Schema.Types.ObjectId }
})


const playlistSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    photoUrl: String, 
    playlistName: String,
    tracklist: String,
    likes: [likesSchema]
})

module.exports = mongoose.model('Playlist', playlistSchema);