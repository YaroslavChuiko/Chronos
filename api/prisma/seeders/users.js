const password = '$2b$12$/vmj.PgKd9vZuxsDFB7LBuxtn9pcCCQi4Xa91cqxsaP9IKdUn5qD.'; // hashed 'somepass'
const options = { isEmailConfirmed: true, password };

const users = [
  { login: 'john_doe', email: 'john_doe@gmail.com', ...options },
  { login: 'michael_bay', email: 'michael_bay@gmail.com', ...options },
  { login: 'nora_tompson', email: 'nora_tompson@gmail.com', ...options },
  { login: 'daniel_johnson', email: 'daniel_johnson@gmail.com', ...options },
  { login: 'rebecca_white', email: 'rebecca_white@gmail.com', ...options },
];

module.exports = users;
