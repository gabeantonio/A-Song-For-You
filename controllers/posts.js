const Playlist = require("../models/playlist");
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3(); 
const { v4: uuidv4 } = require("uuid");
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;

module.exports = {
    create,
    index,
    deletePost
};

function create(req, res) {
    const key = `playlists/posts/${uuidv4()}-${req.file.originalname}`;
    const params = {Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer};
    s3.upload(params, async function(err, data) {
        if(err) return res.status(400).json({err: 'Check your terminal.'})
        try {
            const post = await Playlist.create({
                user: req.user,
                playlistName: req.body.playlistName,
                tracklist: req.body.tracklist,
                photoUrl: data.Location
            })
            res.status(201).json({data: post})
        } catch(err) {
            res.status(400).json(err);
        }
    })
}

async function index(req, res) {
    try {
        const posts = await Playlist.find({}).populate("user").exec();
        res.status(200).json({ data: posts });
    } catch (err) {
    res.status(400).json({ err });
}
}

async function deletePost(req, res){
    try {
        const post = await Playlist.findOne({'post._id': req.params.id});
        post.delete(req.params.id)
        await post.save() 
        res.json({data: 'Deleted'})
    } catch(err){
        res.status(400).json({error: err})
    }
}
