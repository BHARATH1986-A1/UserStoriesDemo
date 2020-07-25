const _ = require('lodash');
const uploadPhotoValidate = require('../validators/uploadphoto');
const db = require('../sqlcon')

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

  const photo = await db.userphotoModel.create({
    userid: body.userid,
    photo: Buffer.from(body.photo, 'base64')
  });
  //  console.log(photo);
  if (photo) {
    ctx.response.status = 200;
    ctx.response.body = JSON.stringify({ message: 'successfully uploaded.' });
  }
};
