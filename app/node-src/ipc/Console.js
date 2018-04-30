/*
Copyright 2018 Cloudbase Solutions Srl

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// @flow

import electron, { ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

// devPath  - /Users/<your_user_name>/Library/Application Support/Electron/
// prodPath - /Users/<your_user_name>/Library/Application Support/Kubinstaller/

const userDataPath = electron.app.getPath('userData')
const fileName = 'console-output.txt'

ipcMain.on('load-console', event => {
  fs.readFile(path.join(userDataPath, fileName), 'utf8', (err, text: string) => {
    if (err) {
      event.sender.send('load-console', { status: 'error', ...err })
    } else {
      event.sender.send('load-console', { status: 'success', text })
    }
  })
})
