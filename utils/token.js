const crypto = require('crypto');
const knex = require('knex')(require('../knexfile'));

const token = {
  generate() {
    const size = 32; // string will be twice as long
    const buf = crypto.randomBytes(size);
    return buf.toString('hex');
  },
  getUser(userToken) {
    return new Promise((resolve, reject) => {
      knex.select()
        .table('user_tokens')
        .where('token', userToken)
        .then((rows) => {
          if (rows.length === 0) {
            reject(new Error('Token not found'));
          }
          const userId = rows[0].user_id;
          resolve(userId);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

module.exports = token;
