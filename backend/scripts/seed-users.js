const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env'),
});

const uri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/awad';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  },
);

const seedUsers = [
  { email: 'alice@example.com', password: 'Password123!' },
  { email: 'bob@example.com', password: 'Password123!' },
  { email: 'carol@example.com', password: 'Password123!' },
];

async function seed() {
  await mongoose.connect(uri);
  const User = mongoose.model('User', userSchema);
  await User.init();

  for (const entry of seedUsers) {
    const hash = await bcrypt.hash(entry.password, 10);
    await User.findOneAndUpdate(
      { email: entry.email },
      { $setOnInsert: { email: entry.email, password: hash } },
      { upsert: true, new: true },
    );
    console.log(`• ensured user ${entry.email}`);
  }

  console.log('✅ Seed data inserted');
}

seed()
  .catch((error) => {
    console.error('❌ Failed to seed database', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
