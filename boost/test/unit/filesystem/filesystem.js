'use strict'

const Fs = require('fs')
const Path = require('path')
const Uuid = require('uuid/v4')
const Filesystem = util('filesystem')
const BaseTest = util('base-test')

class FilesystemTest extends BaseTest {
  async before () {
    this.tempDir = Path.resolve(__dirname, 'tmp')
    Fs.mkdirSync(this.tempDir)
  }

  async alwaysAfter () {
    await Filesystem.removeDir(this.tempDir)
  }

  _tempFile (file = `${Uuid()}.txt`) {
    return Path.resolve(this.tempDir, file)
  }

  async _ensureTempFile (filename = `${Uuid()}.txt`) {
    const file = this._tempFile(filename)
    await Filesystem.ensureFile(file)

    return file
  }

  async ensureFile (t) {
    const file = this._tempFile()
    await Filesystem.ensureFile(file)
    const exists = Fs.existsSync(file)

    t.true(exists)
  }

  async exists (t) {
    const file = await this._ensureTempFile()
    const exists = await Filesystem.exists(file)

    t.true(exists)
  }

  async pathExists (t) {
    const file = await this._ensureTempFile()
    const pathExists = await Filesystem.pathExists(file)

    t.true(pathExists)
  }

  async readFile (t) {
    const file = await this._ensureTempFile()
    Fs.writeFileSync(file, 'Hello Boost', 'utf8')
    const content = await Filesystem.readFile(file)

    t.is(content, 'Hello Boost')
  }
}

module.exports = new FilesystemTest()
