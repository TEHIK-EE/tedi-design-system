module.exports = (dts, { classes, fileName, logger }) => {
  try {
    return dts.replace('};\n', '[key: string]: string;\n };\n');
  } catch (error) {
    logger.error(error.message);
  }
};
