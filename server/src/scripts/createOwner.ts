import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "../models/user.model";

// Load environment variables
dotenv.config();

export const DB_NAME = "SHOPXET-DB";

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(
          `${process.env.MONGODB_URI}/${DB_NAME}`
        );
    console.log("Connected to MongoDB ✅");

    // Check if owner already exists
    const existingOwner = await User.findOne({ email: "developersayem012@gmail.com" });
    if (existingOwner) {
      console.log("Owner already exists ❌");
      process.exit(0);
    }

    // Create new owner
    const owner = new User({
      fullName: "Developer Sayem",
      email: "developersayem012@gmail.com",
      password: "11111111", // will be hashed by pre-save hook
      role: "owner",
      licenseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNheWVtbW9sbGEwMTJAZ21haWwuY29tIiwiaWF0IjoxNzU3OTU3Mjg5fQ.NeZV21wNTYScGl_4Ki0lPSOpCdelsE_4pT3M6_pB7c8",
      licenseSecret: "0d42d6c062d2fb538485cbb37887fe5678466ae19dd2423e199e2b1dd0451d32",
    });

    await owner.save();
    console.log("✅ Owner account created with license");

    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating owner:", err);
    process.exit(1);
  }
})();

//*---------------TO run this script from terminal---------------*//
//               npx ts-node src/scripts/createOwner.ts  