const config = require('./_scripts/token.json');

const localeHome = require('./locale.json');
const localeContent = require('./base/content/locale.json');
const localeTypography = require('./base/typography/locale.json');

module.exports = {
  locals: {
    config,
    fn: {
      className(blockName, elementName, modifierName, optionName) {
        let result = blockName;
        if (elementName !== '') {
          result += config.separators.element + elementName;
        }
        if (modifierName !== '') {
          result += config.separators.modifier + modifierName;
        }
        if (optionName !== '') {
          result += config.separators.modifier + optionName;
        }
        return result;
      },
    },
    locale: {
      home: localeHome,
      typography: localeTypography,
      content: localeContent,
    },
  },
};
