const HTTP = 'http://';
const EDITABLE = '/?edit=true';
const DOMAIN = 'mysite.com';

module.exports = class SitePage {
  constructor(siteGroup, userGroup) {
    this.siteGroup = siteGroup;
    this.userGroup = userGroup;
  }

  getEditablePageUrl(params) {
    return HTTP + DOMAIN + EDITABLE + this.formatParams(params) + this.getAttributes();
  }

  getAttributes() {
    return '&siteGrp=' + this.siteGroup + '&userGrp=' + this.userGroup;
  }

  formatParams(params) {
    let paramsString = '';

    for (const [key, value] of params) {
      paramsString += '&' + key + '=' + value;
    }

    return paramsString;
  }
};
