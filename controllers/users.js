const User = require('../models/user');
const Playlist = require('../models/playlist');
const jwt = require('jsonwebtoken');
// const S3 = require("aws-sdk/clients/s3");
// const s3 = new S3();
// const { v4: uuidv4 } = require("uuid");
// const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const SECRET = process.env.SECRET;

module.exports = {
  signup,
  login,
  profile
};

async function profile(req, res) {
  try {

    const user = await User.findOne({username: req.params.username});
    if (!user) return res.status(404).json({error: 'User not found.'});
    const posts = await Playlist.find({user: user._id}).populate('user').exec();
    res.status(200).json({data:{
      user: user,
      posts: posts
    }});

  } catch(err) {
    res.status(400).json({error: 'Something went wrong in the Profile Controller!'});
  }
}


async function signup(req, res) {
  console.log(req.body, " req.body in signup");
  const user = new User({ ...req.body});
    try {
      await user.save();
      const token = createJWT(user);
      res.json({ token });
    } catch (err) {
      if (err.name === "MongoServerError" && err.code === 11000) {
        res
          .status(423)
          .json({
            errorMessage: err,
            err: `${identifyKeyInMongooseValidationError(
              err.message
            )} Already taken!`,
          });
      } else {
        res.status(500).json({
          err: err,
          message: "Internal Server Error, Please try again",
        });
      }
    }
}

async function login(req, res) {
  try {
    const user = await User.findOne({email: req.body.email});
    console.log(user, ' this user in login')
    if (!user) return res.status(401).json({err: 'bad credentials'});
    // had to update the password from req.body.pw, to req.body password
    user.comparePassword(req.body.password, (err, isMatch) => {
        
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json({err: 'error message'});
  }
}


function createJWT(user) {
  return jwt.sign(
    {user},
    SECRET,
    {expiresIn: '24h'}
  );
}

function identifyKeyInMongooseValidationError(err) {
  let key = err.split("dup key: {")[1].trim();
  key = key.slice(0, key.indexOf(":"));
  return key.replace(/^./, (str) => str.toUpperCase());
}
