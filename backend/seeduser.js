const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const user = require("./models/user");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch(err => console.log(err));

async function seedUser() {
  const hashedPassword = await bcrypt.hash("password123", 10);

  await user.create({
    email: "admin@test.com",
    password: hashedPassword
  });

  console.log("Seed user created");
  process.exit();
}

seedUser();
