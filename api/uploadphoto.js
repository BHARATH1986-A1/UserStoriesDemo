const _ = require('lodash');
const uploadPhotoValidate = require('../validators/uploadphoto');
const db = require('../sqlcon');
const util = require('../utils/util');

module.exports = async function uploadphoto(ctx) {
  const { body } = ctx.request;

  const val = uploadPhotoValidate(body);

  if (!val.valid) {
    //  console.log(val);
    const ers = _.map(val.errors, (err) => (err.stack));
    throw util.createErrorMsg(400, JSON.stringify(ers));
  }

  const user = await db.userModel.findOne({
    where: {
      id: body.userid
    }
  });
  if (user) {
    const userPhoto = await db.userphotoModel.create({
      photo: Buffer.from(body.photo, 'base64')
    });
    if (userPhoto) {
      const photo = await user.setUserPhoto(userPhoto);
      console.log(photo.toJSON());
      if (photo) {
        ctx.response.status = 200;
        ctx.response.body = JSON.stringify({ message: 'successfully uploaded.' });
      } else {
        throw util.createErrorMsg(500, 'Error while creating a photo');
      }
    } else {
      throw util.createErrorMsg(500, 'Error while creating a photo');
    }
  } else {
    throw util.createErrorMsg(400, 'User doesn\'t exist');
  }
};
