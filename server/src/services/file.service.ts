import fs from "fs";
import path from "path";

/**
 * Service for handling file operations (async)
 */
class FileService {
  // Always upload to project root, not dist/
  private uploadRoot = path.resolve(process.cwd(), "uploads");

  constructor() {
    // Ensure root folder exists
    this.ensureDir(this.uploadRoot);
  }

  /**
   * Ensure folder exists
   */
  private async ensureDir(folder: string) {
    try {
      await fs.promises.access(folder);
    } catch {
      await fs.promises.mkdir(folder, { recursive: true });
    }
  }

  /**
   * Generate custom file name
   */
  generateFileName(originalName: string, customBaseName?: string): string {
    const ext = path.extname(originalName);
    const safeBase = (customBaseName || path.basename(originalName, ext))
      .replace(/\s+/g, "-")
      .toLowerCase();

    return `${safeBase}${ext}`;
  }

  /**
   * Build public URL for file
   */
  getFileUrl(folder: string, filename: string): string {
    const baseUrl = process.env.BASE_URL || "http://localhost:5000";
    return `${baseUrl}/uploads/${folder}/${filename}`;
  }

  /**
   * Delete file from disk
   */
  async deleteFile(folder: string, filename: string): Promise<void> {
    const filePath = path.join(this.uploadRoot, folder, filename);
    try {
      await fs.promises.unlink(filePath);
    } catch (err: any) {
      if (err.code !== "ENOENT") throw err; // ignore if file doesn't exist
    }
  }

  /**
   * Move/rename uploaded file (multer already stored it in /uploads)
   */
  async moveFile(tempPath: string, folder: string, filename: string): Promise<string> {
    const targetFolder = path.join(this.uploadRoot, folder);
    await this.ensureDir(targetFolder);

    const targetPath = path.join(targetFolder, filename);

    // Overwrite safely if file already exists
    try {
      await fs.promises.unlink(targetPath);
    } catch (err: any) {
      if (err.code !== "ENOENT") throw err;
    }

    await fs.promises.rename(tempPath, targetPath);
    return targetPath;
  }
}

export const fileService = new FileService();
