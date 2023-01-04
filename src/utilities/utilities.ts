import * as fs from 'fs';
import path from 'path';
import sharp from 'sharp';

export const imagesPath = path.resolve(__dirname, '../../images');
export const thumbImagesPath = path.resolve(__dirname, '../../images-thumb');
export const fileExtension = '.jpg'; // this ensure that it processed the image to a jpg file.

export default class ImageToolbox {
  //check filename for validity and existance
  static isFileName(filename: string | undefined): boolean {
    const availableImageFilenames: string[] = [];
    if (!filename) {
      return false;
    } else {
      fs.readdirSync(imagesPath).forEach((file) => {
        const filenameWithoutTypeExt = file.substring(0, file.indexOf('.'));
        availableImageFilenames.push(filenameWithoutTypeExt);
      });
      return availableImageFilenames.includes(filename);
    }
  }

  //confirm parameter enteried is a positive number
  static isRealNumber(parameter: string | undefined): boolean {
    return Number(parameter) > 0;
  }

  //use the fileExtension variable to allow different images to be processed to jpeg
  static createFilePath(filename?: string): string {
    return `${imagesPath}\\${filename}${fileExtension}`;
  }

  //creates the thumb file path to send to the route
  static createThumbFilePath(
    filename?: string,
    height?: string,
    width?: string
  ): string {
    const newFileName: string | undefined =
      filename && height && width ? filename + height + width : undefined;
    return `${thumbImagesPath}\\${newFileName}${fileExtension}`;
  }

  //creates the new thumb file if it does not already exist
  static async createThumbFile(
    filename?: string,
    height?: string,
    width?: string
  ): Promise<string> {
    const thumbPath = this.createThumbFilePath(filename, height, width);
    const path = this.createFilePath(filename);
    await sharp(path)
      .resize(Number(height), Number(width))
      .toFile(thumbPath, () => {
        return;
      });
    return `The image ${filename} now has a height of ${height} and a width of ${width}.`;
  }

  //checks to see if the file already exists
  static isThumbFIle(
    filename?: string,
    height?: string,
    width?: string
  ): boolean {
    const thumbPath = this.createThumbFilePath(filename, height, width);
    try {
      fs.accessSync(thumbPath);
      return true;
    } catch {
      return false;
    }
  }
};