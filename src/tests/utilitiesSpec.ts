import ImageUtilities from '../utilities/utilities';
import { imagesPath, thumbImagesPath, fileExtension } from '../utilities/utilities';

describe('utilities tests', () => {
  it('should get a valid response for file names in root folder', () => {
    const filename = 'fjord';
    expect(ImageUtilities.isFileName(filename)).toBeTruthy;
    const filename2 = 'nonexistent';
    expect(ImageUtilities.isFileName(filename2)).toBeFalsy;
  });
});

describe('is valid numbers', () => {
  it('should check parameters provided are positive integers', () => {
    expect(ImageUtilities.isRealNumber('10')).toBeTruthy;
    expect(ImageUtilities.isRealNumber('-19')).toBeFalsy;
    expect(ImageUtilities.isRealNumber('r2d2')).toBeFalsy;
  });
});

describe('create paths', () => {
  it('should return a path to an unprocessed image before processing has occurred', () => {
    const string = ImageUtilities.createFilePath('raw');
    expect(string).toBe(`${imagesPath}\\raw${fileExtension}`);
  });

  it('should return a path to a thumb image named processed500500.jpg', () => {
    const string = ImageUtilities.createThumbFilePath('processed', '500', '500');
    expect(string).toBe(`${thumbImagesPath}\\processed500500${fileExtension}`);
  });

  it('should complete processing a file', async () => {
    await expectAsync(
      ImageUtilities.createThumbFile('testImage', '200', '200')
    ).toBeResolved();
  });

  it('should process  file and notify the user', async () => {
    const processingMessage: string = await ImageUtilities.createThumbFile(
      'picha',
      '350',
      '450'
    );
    expect(processingMessage).toEqual(
      `The image picha now has a height of 350 and a width of 450.`
    );
  });
});

describe('is thumb file', () => {
  it('should return false if the file exists', () => {
    expect(ImageUtilities.isThumbFIle()).toBeFalsy;
  });
});