import express from 'express';
import ImageToolbox from '../../utilities/utilities';

const images = express.Router();

images.get('/', async (req: express.Request, res: express.Response) => {
  const filename = req.query.filename?.toString();
  const height = req.query.height?.toString();
  const width = req.query.width?.toString();
  
  //check for query parameters from the request url
  const acceptedFilename = ImageToolbox.isFileName(filename);
  const acceptedHeight = ImageToolbox.isRealNumber(height);
  const acceptedWidth = ImageToolbox.isRealNumber(width);

  if (!acceptedFilename) {
    res.send(
      `All image parameters are required, the filename is invalid.`
    );
  } else if (!acceptedHeight) {
    res.send(
      'Please imput a height that is a positive integer.'
    );
  } else if (!acceptedWidth) {
    res.send(
      'Please enter a width that is a positive integer.'
    );
  } else {
    //check to see if filename specified exists
    const thumbFileCheck = ImageToolbox.isThumbFIle(filename, height, width);
    if (thumbFileCheck) {
      //if file has been processed before return processed version
      res.sendFile(ImageToolbox.createThumbFilePath(filename, height, width));
    } else {
     //if file exists and has not been processed before, process and return the new file, create thumb for new image
      await ImageToolbox.createThumbFile(filename, height, width).then(() => {
        res.setTimeout(6000, () => {
          res.sendFile(
            ImageToolbox.createThumbFilePath(filename, height, width)
          );
        });
      });
    }
  }
});

export default images;