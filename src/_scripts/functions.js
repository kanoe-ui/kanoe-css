const $config = require('./token.json');

const externalFonts = () => {
  return $config.externalFonts;
};

const getBlockConfig = (blockKey) => {
  if ($config[blockKey]) {
    return $config[blockKey];
  } else {
    throw `${blockKey} dont exist on config`;
  }
};

const getElementConfig = (blockKey, elementKey) => {
  const block = getBlockConfig(blockKey);
  if (block.elements[elementKey]) {
    return block.elements[elementKey];
  } else {
    throw `${elementKey} dont exist on config`;
  }
};

const getModifierConfig = (blockKey, modifierKey) => {
  const block = getBlockConfig(blockKey);
  if (block.modifiers[modifierKey]) {
    return block.modifiers[modifierKey];
  } else {
    throw `${modifierKey} dont exist on config`;
  }
};

const getOptionConfigByName = (blockKey, modifierKey, optionName) => {
  const modifier = getModifierConfig(blockKey, modifierKey);
  const optionConfig = modifier.options.find(
    (option) => option.name === optionName
  );
  if (optionConfig) {
    return optionConfig;
  } else {
    throw `${optionName} dont exist on config`;
  }
};

const getOptionDefaultConfig = (blockKey, modifierKey) => {
  const modifier = getModifierConfig(blockKey, modifierKey);
  const optionConfig = modifier.options.find((option) => option.default);
  if (optionConfig) {
    return optionConfig;
  } else {
    throw `Default dont exist on config`;
  }
};

const customPropBase = (blockKey, modifierKey) => {
  const separators = $config.separators;
  const blockName = getBlockConfig(blockKey).name;
  const modifierName = getModifierConfig(blockKey, modifierKey).name;
  return `--${blockName}${separators.customProperty}${modifierName}`;
};

const customPropDefaultValue = (blockKey, modifierKey) => {
  const separators = $config.separators;
  const blockName = getBlockConfig(blockKey).name;
  const modifierName = getModifierConfig(blockKey, modifierKey).name;
  const optionDefaultName = getOptionDefaultConfig(blockKey, modifierKey).name;
  return `--${blockName}${separators.customProperty}${modifierName}${separators.customProperty}${optionDefaultName}`;
};

const customPropName = (blockKey, modifierKey, optionName) => {
  const separators = $config.separators;
  const blockName = getBlockConfig(blockKey).name;
  const modifierName = getModifierConfig(blockKey, modifierKey).name;
  const optionConfigName = getOptionConfigByName(
    blockKey,
    modifierKey,
    optionName
  ).name;
  return `--${blockName}${separators.customProperty}${modifierName}${separators.customProperty}${optionConfigName}`;
};

const joinCustomProps = (blockKey, modifierKey) => {
  const modifierConfig = getModifierConfig(blockKey, modifierKey);
  const result = modifierConfig.options.map((option) => {
    return `var(${customPropName(blockKey, modifierKey, option.name)})`;
  });
  return result.join(', ');
};

const customPropValue = (blockKey, modifierKey, optionName) => {
  const separators = $config.separators;
  const blockName = getBlockConfig(blockKey).name;
  const modifierName = getModifierConfig(blockKey, modifierKey).name;
  const optionConfigvalue = getOptionConfigByName(
    blockKey,
    modifierKey,
    optionName
  ).value;
  return optionConfigvalue;
};

const className = (
  blockKey,
  elementKey = false,
  modifierKey = false,
  optionName = false
) => {
  let result = '';
  const separators = $config.separators;
  const blockName = getBlockConfig(blockKey).name;
  result = blockName;
  if (elementKey) {
    const elementName = getElementConfig(blockKey, elementKey);
    result += `${separators.element}${elementName}`;
  }
  if (modifierKey) {
    const modifierName = getModifierConfig(blockKey, modifierKey).name;
    result += `${separators.modifier}${modifierName}`;
  }
  if (optionName) {
    const optionConfigName = getOptionConfigByName(
      blockKey,
      modifierKey,
      optionName
    ).name;
    result += `${separators.modifier}${optionConfigName}`;
  }

  return result;
};

exports.functions = {
  customPropBase,
  customPropDefaultValue,
  customPropName,
  customPropValue,
};

var plugin = function () {
  return (style) => {
    style.define('cpJoin', (blockKey, modifierKey) => {
      return joinCustomProps(
        blockKey.string,
        modifierKey.string || modifierKey.name
      );
    });

    style.define('extFonts', () => {
      return externalFonts();
    });

    style.define('cpBase', (blockKey, modifierKey) => {
      return customPropBase(
        blockKey.string,
        modifierKey.string || modifierKey.name
      );
    });

    style.define('cpBaseValue', (blockKey, modifierKey) => {
      return customPropDefaultValue(
        blockKey.string,
        modifierKey.string || modifierKey.name
      );
    });

    style.define('cpName', (blockKey, modifierKey, optionName) => {
      return customPropName(
        blockKey.string,
        modifierKey.string || modifierKey.name,
        optionName.string || optionName.name
      );
    });
    style.define('cpValue', (blockKey, modifierKey, optionName) => {
      return customPropValue(
        blockKey.string,
        modifierKey.string || modifierKey.name,
        optionName.string || optionName.name
      );
    });
    style.define(
      'getClassName',
      (blockKey, elementKey, modifierKey, optionName) => {
        return className(
          blockKey.string,
          elementKey.string || elementKey.name,
          modifierKey.string || modifierKey.name,
          optionName.string || optionName.name
        );
      }
    );
  };
};
module.exports = plugin;
