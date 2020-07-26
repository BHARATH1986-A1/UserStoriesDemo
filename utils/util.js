module.exports = {
  createErrorMsg: (status, msg) => {
    const e = new Error(msg);
    e.status = status;
    return e;
  },
  extractEmails: (text) => (text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi))
}