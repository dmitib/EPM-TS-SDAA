const path = require('path');
const fs = require('fs');

const PropertyUtil = require('./thirdparty/property-util');
const InvalidFileTypeError = require('./thirdparty/invalid-file-type-error');
const InvalidDirectoryException = require('./thirdparty/invalid-directory-exception');
const FileExtensionPredicate = require('./file-ext-pred');

const VALID_IMAGE_TYPES = ['jpg', 'png'];
const VALID_DOCUMENT_TYPES = ['pdf', 'doc'];

module.exports = class FileManager {
  constructor() {
    this.basePath = PropertyUtil.loadProperty('basePath');
  }

  isNotDirectory(stats) {
    return !stats.isDirectory();
  }

  validateDirectory(stats, directoryPath) {
    if (this.isNotDirectory(stats)) {
      throw new InvalidDirectoryException('Invalid directory found: ' + directoryPath);
    }
  }

  isInvalidImage(fileName) {
    const imageExtensionsPredicate = new FileExtensionPredicate(VALID_IMAGE_TYPES);
    return !imageExtensionsPredicate.test(fileName);
  }

  isInvalidDocument(fileName) {
    const documentExtensionsPredicate = new FileExtensionPredicate(VALID_DOCUMENT_TYPES);
    return !documentExtensionsPredicate.test(fileName);
  }

  isInvalidFileType(fileName) {
    return this.isInvalidImage(fileName) && this.isInvalidDocument(fileName);
  }

  validateFileType(fileName) {
    if (this.isInvalidFileType(fileName)) {
      throw new InvalidFileTypeError('File type not Supported: ' + fileName);
    }
  }

  getDirectory(directoryPath) {
    const stats = fs.statSync(directoryPath);
    this.validateDirectory(stats, directoryPath);
    return fs.readdirSync(directoryPath);
  }

  getFile(fileName) {
    this.validateFileType(fileName);
    const directoryPath = this.basePath + path.sep;
    return path.resolve(directoryPath, fileName);
  }

  getFiles(directoryPath, allowedExtensions) {
    const fileExtensionPredicate = new FileExtensionPredicate(allowedExtensions);
    return this.getDirectory(directoryPath).filter((extension) => {
      return fileExtensionPredicate.test(extension);
    });
  }

  getAllImages() {
    return this.getFiles(this.basePath, VALID_IMAGE_TYPES);
  }

  getAllDocumentFiles() {
    return this.getFiles(this.basePath, VALID_DOCUMENT_TYPES);
  }
};
