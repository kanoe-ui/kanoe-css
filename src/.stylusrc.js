const isDevelopment = process.env.NODE_ENV === 'development';

const config = {
  paths: [__dirname, __dirname + '/_scripts'],
  compress: !isDevelopment,
};

module.exports = config;
