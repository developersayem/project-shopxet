import { Request, Response, NextFunction } from "express";
import {SiteSettings} from "../../models/site-settings.model";



// *Get SiteSettings
export const getSiteSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await SiteSettings.findOne();
    if (!settings) return res.status(404).json({ message: "Site settings not found ❌" });

    res.json(settings);
  } catch (error) {
    next(error);
  }
};

// * Update SiteSettings
export const updateSiteSettings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { primaryColor, secondaryColor, logo, bannerImages } = req.body;

    let settings = await SiteSettings.findOne();
    if (!settings) {
      // create if not exists
      settings = await SiteSettings.create({
        primaryColor,
        secondaryColor,
        logo,
        bannerImages,
      });
      return res.status(201).json({ message: "Site settings created ✅", settings });
    }

    if (primaryColor) settings.primaryColor = primaryColor;
    if (secondaryColor) settings.secondaryColor = secondaryColor;
    if (logo) settings.logo = logo;
    if (bannerImages) settings.bannerImages = bannerImages;

    await settings.save();

    res.json({ message: "Site settings updated ✅", settings });
  } catch (error) {
    next(error);
  }
};
