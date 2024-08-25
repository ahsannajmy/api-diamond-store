import bcrypt from 'bcrypt';

const passwordHasher = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password,salt);
}

export default passwordHasher;