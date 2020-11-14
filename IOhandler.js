/*
 * Project: COMP1320 Milestone 1
 * File Name: IOhandler.js
 * Description: Collection of functions for files input/output related operations
 * 
 * Created Date: 
 * Author: 
 * 
 */

const unzipper = require('unzipper'),
  fs = require("fs"),
  PNG = require('pngjs').PNG,
  path = require('path');


/**
 * Description: decompress file from given pathIn, write to given pathOut 
 *  
 * @param {string} pathIn 
 * @param {string} pathOut 
 * @return {promise}
 */
 const unzip = (pathIn, pathOut) => {
   return new Promise((resolve, reject)=> {
  
  fs.createReadStream(pathIn)
  .pipe(unzipper.Extract({ path: pathOut }))
  .on("error", reject) 
  .on("finish", resolve)
  console.log("Extraction operation complete")
  })
};




/**
 * Description: read all the png files from given directory and return Promise containing array of each png file path 
 * 
 * @param {string} path 
 * @return {promise}
 */
const readDir = dir => {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err)
      };
      const pngFiles = files.filter(file => path.extname(file).toLowerCase() == ".png");
      const filesWithPath = [];
      for (const file of pngFiles) {
        filesWithPath.push(path.join(dir, file));
      };
      resolve(filesWithPath);
    });
  });
};




/**
 * Description: Read in png file by given pathIn, 
 * convert to grayscale and write to given pathOut
 * 
 * @param {string} filePath 
 * @param {string} pathProcessed 
 * @return {promise}
 */
const grayScale = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(pathIn)
      .pipe(
        new PNG({
          filterType: 4,
        })
      )
      .on("parsed", function () {
        // gray scale
        for (let i = 0; i < this.data.length; i++) {
          const gray = (this.data[i] * 0.3 + this.data[i + 1] * 0.59 + this.data[i + 2] * 0.11);
          this.data[i] = gray;
          this.data[i + 1] = gray;
          this.data[i + 2] = gray;
          i = i + 3;
        }
        this.pack().pipe(fs.createWriteStream(path.join(pathOut, path.basename(pathIn))));
        resolve("done");
      });
  });
};

module.exports = {
  unzip,
  readDir,
  grayScale
};