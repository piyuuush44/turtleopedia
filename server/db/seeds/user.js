const path = require('path');
const fs = require('fs');
const User = require('../../src/models/user');

module.exports = async ()=>{
  try {
    // Add user
    const filePath = path.join(__dirname, '../files/user.json');
    const content = fs.readFileSync(filePath, 'utf-8');
    await Promise.all(JSON.parse(content)
        .map(async (s) => {
          const user = new User();
          user.first_name = s.first_name;
          user.last_name = s.last_name;
          user.email = s.email;
          user.phone = s.phone;
          user.password_hash = s.password_hash;
          await user.save();
        }));
  } catch (e) {
    throw new Error(e);
  }
};
