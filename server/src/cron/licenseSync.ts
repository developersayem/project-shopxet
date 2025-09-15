// cron/licenseSync.ts
import cron from "node-cron";
import { User } from "../models/user.model";
import { verifyLicenseWithLMS } from "../utils/verifyLicenseWithLMS";

cron.schedule("*/30 * * * *", async () => {
  console.log("🔄 Running license sync job...");
  const owners = await User.find({ role: "owner", licenseKey: { $ne: null } });
  for (const owner of owners) {
    await verifyLicenseWithLMS(owner._id as string);
  }
});
