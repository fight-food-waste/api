const crypto = require('crypto');

const token = {
  generate() {
    const size = 32; // string will be twice as long
    const buf = crypto.randomBytes(size);
    return buf.toString('hex');
  },
};

module.exports = token;
