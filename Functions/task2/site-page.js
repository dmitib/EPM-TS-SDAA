const HTTP = 'http://';
const EDITABLE = '/?edit=true';
const DOMAIN = 'mysite.com';

module.exports = class SitePage {
    constructor(siteGroup, userGroup) {
        this.siteGroup = siteGroup;
        this.userGroup = userGroup;
    }

    getEditablePageUrl(params) {
        let paramsString = '';

        for (const [key, value] of params) {
            paramsString += '&' + key + '=' + value;
        }

        return HTTP + DOMAIN + EDITABLE + paramsString + this.getAttributes();
    }

    getAttributes() {
        return '&siteGrp=' + this.siteGroup + '&userGrp=' + this.userGroup;
    }
};
