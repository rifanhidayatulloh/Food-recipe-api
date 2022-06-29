const fs = require("fs");

const deleteFile = (filePath) => {
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log("failed to delete image");
      }
    });
  }
};

module.exports = deleteFile;
