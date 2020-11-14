/*
 * Project: COMP1320 Milestone 1
 * File Name: main.js
 * Description: 
 * 
 * Created Date: 
 * Author:
 * 
 */

const IOhandler = require("./IOhandler"),
  zipFilePath = `${__dirname}/myfile.zip`,
  pathUnzipped = `${__dirname}/unzipped`,
  pathProcessed = `${__dirname}/grayscaled`;

  const { unzip, readDir, grayScale } = require('./IOhandler') 

  const IOhandler = require("./IOhandler"),
    zipFilePath = `${__dirname}/myfile.zip`,
    pathUnzipped = `${__dirname}/unzipped`,
    pathProcessed = `${__dirname}/grayscaled`;
  
  unzip(zipFilePath, pathUnzipped)
    .then(result => readDir(pathUnzipped))
    .then(filePaths => {
      filePaths.forEach(filePath => {
        grayScale(filePath, pathProcessed)
      })
    })
    .catch(err => console.log(err));


  


