module.exports = class FileExtensionPredicate {
  constructor(extensions) {
    this.extensions = extensions;
  }

  checkExtension(fileName) {
    return this.extensions.some((extension) => {
      return fileName.toLowerCase().endsWith(extension);
    });
  }
};
