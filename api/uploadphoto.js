const _ = require('lodash');
const uploadPhotoValidate = require('../validators/uploadphoto');
const db = require('../sqlcon');

module.exports = async function uploadphoto(ctx) {
  const { body } = ctx.request;

  const val = uploadPhotoValidate(body);

  if (!val.valid) {
    //  console.log(val);
    const ers = _.map(val.errors, (err) => (err.stack));
    const e = new Error(JSON.stringify(ers));
    e.status = 400;
    throw e;
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
        throw new Error('Error while creating a photo');
      }
    } else {
      throw new Error('Error while creating a photo');
    }
  } else {
    throw new Error('User doesn\'t exist');
  }
};
