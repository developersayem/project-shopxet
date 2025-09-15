import { LMS_URL } from '../constants';
import axios from "axios";
import { User } from "../models/user.model";


export const verifyLicenseWithLMS = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      console.log("User not found for license check");
      return false;
    }
    if (!user.licenseKey || !user.licenseSecret) {
      console.log("User missing license key or secret");
      return false;
    }
    if (!LMS_URL) {
      console.log("LMS_URL not configured");
      return false;
    }

    console.log("Sending license verification request to LMS...", {
      licenseKey: user.licenseKey,
      licenseSecret: user.licenseSecret,
    });

    const response = await axios.post(LMS_URL, {
      licenseKey: user.licenseKey,
      licenseSecret: user.licenseSecret,
    });


    const {data} = response.data;

    if (data.isValid === true && data.status === "active") {
      console.log("License is valid, updating user...");
      user.licenseLastSyncedAt = new Date();
      await user.save();
      return true;
    }

    console.log("License invalid or inactive");
    return false;
  } catch (err) {
    console.error("LMS verification failed:", err);
    return false;
  }
};

