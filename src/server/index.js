const path          = require('path');
const webpack       = require('webpack');
const express       = require('express');

const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');

const config        = require('../../webpack.config.js');
const compiler      = webpack(config);

const chalk         = require('chalk');

const DOCS_PATH = '../../dist/';
/*
const PORT      = 3002;
const IP_ADRESS = 'localhost';
*/
const PORT = process.env.PORT;
const IP_ADRESS = process.env.HOSTNAME;
const app       = express();   

//const TARGET = process.env.npm_lifecycle_event;  

/*if(TARGET === "dev") {
  app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
    historyApiFallback: true
  }));
  app.use(hotMiddleware(compiler));
} else if(TARGET === "prod") {*/
  app.use(express.static(path.join(__dirname, DOCS_PATH)));
/*}*/
app.get(
  '/*',
  (req, res) => res.sendFile(path.join(__dirname, DOCS_PATH, 'index.html'))
);

/*if(TARGET === "dev") {
  return app.listen(
    PORT, 
    (err) => {
    if (err) {
      return console.error(err);
    }
    console.log(`
        =====================================================
        -> Server (${chalk.bgBlue('Hot reload')}) 🏃 (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
        =====================================================
    `);
  });
} else if(TARGET === "prod") {*/
  return app.listen(
    PORT,
    IP_ADRESS,
    () => console.log(`
      =====================================================
      -> Server (${chalk.bgBlue('SPA')}) 🏃  (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
      =====================================================
    `)
  );
/*}*/