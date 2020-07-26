module.exports = {
  createErrorMsg: (status, msg) => {
    const e = new Error(msg);
    e.status = status;
    return e;
  },
  extractEmails: (text) => (text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi)),
  emailValidate: (text) => {
    if (text) {
      if (typeof text === 'string') {
        return text.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
      }
    }
    return false;
  }
}