const bcrypt = require('bcrypt'); // Import the bcrypt library, used for hashing and comparing passwords securely

const SALT_ROUNDS = 10; // Define the number of salt rounds to use for hashing passwords

module.exports.hash = async pwd => await bcrypt.hash(pwd, SALT_ROUNDS); // Export a function called `hash` that takes a plain password (`pwd`) and returns its hashed version
module.exports.compare = async (pwd, hash) => await bcrypt.compare(pwd, hash);
