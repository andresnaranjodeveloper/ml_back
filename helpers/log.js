const fs = require("fs");
const fileLog = `${__dirname}/../log/error.json`;

//* Reading the log file
const logRead = () => {
  if(!fs.existsSync(fileLog)) {
    fs.writeFileSync(fileLog, JSON.stringify([]));
  }

  const log = fs.readFileSync(fileLog, {encoding: 'utf-8'});
  const data = JSON.parse(log);
  return data;
}

//* Write the log file
const logSave = (status, error, fun) => {
  let log = logRead();

  const date = new Date();
  const formatDate = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  
  const data = {status, error, function: fun, date: formatDate};

  log.push(data);

  fs.writeFileSync(fileLog, JSON.stringify(log));
}

module.exports = {
  logSave,
  logRead
}