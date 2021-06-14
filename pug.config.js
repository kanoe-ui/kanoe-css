const config = require('./src/_scripts/token.json');

const localeGeneral = require('./src/locale-general.json');
const localeHome = require('./src/locale.json');
const localeContent = require('./src/base/content/locale.json');
const localeTypography = require('./src/base/typography/locale.json');

const className = (blockName, elementName, modifierName, optionName) => {
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
};

const getExamples = (locale, blockKey, modifierKey, optionValue) => {
  let result = [];
  if (
    locale[blockKey] &&
    locale[blockKey].modifiers &&
    locale[blockKey].modifiers[modifierKey]
  ) {
    result = locale[blockKey].modifiers[modifierKey].find(
      (example) => example.value === optionValue
    )?.examples;
  }
  return result;
};

module.exports = {
  locals: {
    config,
    fn: {
      className,
      getExamples,
    },
    locale: {
      general: localeGeneral,
      home: localeHome,
      typography: localeTypography,
      content: localeContent,
    },
  },
};
