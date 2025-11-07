const path = require('path');
const mongoose = require('mongoose');

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

async function bootstrap() {
  await mongoose.connect(uri);
  const User = mongoose.model('User', userSchema);
  await User.init(); // ensures indexes (unique email) exist
  console.log('✅ User collection initialized');
}

bootstrap()
  .catch((error) => {
    console.error('❌ Failed to initialize database', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
