const bcrypt = require('bcryptjs');

(async () => {
  const hashed = await bcrypt.hash('Shiva@143', 10);
  console.log(hashed);
})();
