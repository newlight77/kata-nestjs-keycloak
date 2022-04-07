import fs = require('fs');
import { DBConnectionConfig } from '../environment/db.config';

const writeConfigToFile = () => {
  fs.rm;
  fs.writeFileSync('ormconfig.json', JSON.stringify(DBConnectionConfig, null, 2));
};

writeConfigToFile();
