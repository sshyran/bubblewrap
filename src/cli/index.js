/*
 * Copyright 2019 Google Inc. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

'use strict';

const minimist = require('minimist');
const {Config} = require('../lib/Config');

class Cli {
  async run(args) {
    const config = await Config.loadOrCreate();

    args = minimist(args);
    const command = args._[0] || 'help';
    switch (command) {
      case 'help':
        return await require('./cmds/help')(args, config);
      case 'init':
        return await require('./cmds/init')(args, config);
      case 'update':
        return await require('./cmds/update')(args, config);
      case 'build':
        return await require('./cmds/build')(args, config);
      default:
        throw new Error(`"${command}" is not a valid command!`);
    }
  }
}

module.exports = Cli;
