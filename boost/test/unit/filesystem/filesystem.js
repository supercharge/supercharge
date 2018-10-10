'use strict'

const Fs = require('fs')
const Path = require('path')
const Uuid = require('uuid/v4')
const BaseTest = util('base-test')
const Filesystem = util('filesystem')

class FilesystemTest extends BaseTest {
  async before () {
    this.tempDir = Path.resolve(__dirname, 'tmp')
    Fs.mkdirSync(this.tempDir)
  }

  async alwaysAfter () {
    await Filesystem.removeDir(this.tempDir)
  }

  async _tempFile (file = `${Uuid()}.txt`) {
    return Path.resolve(this.tempDir, file)
  }

  async _ensureTempFile (filename = `${Uuid()}.txt`) {
    const file = await this._tempFile(filename)
    await Filesystem.ensureFile(file)

    return file
  }

  async stat (t) {
    const file = await this._ensureTempFile()
    const stat = await Filesystem.stat(file)
    const statSync = await Fs.statSync(file)

    t.deepEqual(stat, statSync)
  }

  async access (t) {
    const file = await this._ensureTempFile()
    const access = await Filesystem.access(file, Fs.constants.W_OK)
    const accessSync = await Fs.accessSync(file, Fs.constants.W_OK)

    t.deepEqual(access, accessSync)
  }

  async pathExists (t) {
    const file = await this._ensureTempFile()
    const pathExists = await Filesystem.pathExists(file)

    t.true(pathExists)
  }

  async exists (t) {
    const file = await this._ensureTempFile()
    const exists = await Filesystem.exists(file)

    t.true(exists)
  }

  async ensureFile (t) {
    const file = await this._tempFile()
    await Filesystem.ensureFile(file)
    const exists = Fs.existsSync(file)

    t.true(exists)
  }

  async readFile (t) {
    const file = await this._ensureTempFile()
    Fs.writeFileSync(file, 'Hello Boost', 'utf8')
    const content = await Filesystem.readFile(file)

    t.is(content, 'Hello Boost')
  }

  async readDir (t) {
    const dirPath = Path.resolve(this.tempDir, 'tempDir')
    Fs.mkdirSync(dirPath)

    const filePath = Path.resolve(dirPath, 'test.txt')
    Fs.writeFileSync(filePath, 'Hello Boost', 'utf8')

    const dirContent = await Filesystem.readDir(dirPath)

    t.deepEqual(dirContent, ['test.txt'])
  }

  async writeFile (t) {
    const file = await this._ensureTempFile()
    await Filesystem.writeFile(file, 'Hello Boost')

    const content = await Filesystem.readFile(file)

    t.is(content, 'Hello Boost')
  }

  async removeFile (t) {
    const file = await this._ensureTempFile()
    await Filesystem.removeFile(file)

    const exists = await Filesystem.exists(file)

    t.false(exists)
  }

  async copy (t) {
    const source = await this._ensureTempFile()
    const destination = Path.resolve(this.tempDir, 'copy.txt')
    await Filesystem.copy(source, destination)

    const sourceExists = await Filesystem.exists(source)
    const destExists = await Filesystem.exists(destination)

    t.true(sourceExists)
    t.true(destExists)
  }

  async move (t) {
    const source = await this._ensureTempFile()
    const destination = Path.resolve(this.tempDir, 'moved.txt')
    await Filesystem.move(source, destination)

    t.false(await Filesystem.exists(source))
    t.true(await Filesystem.exists(destination))
  }

  async ensureDir (t) {
    const dir = Path.resolve(this.tempDir, 'ensureDir')
    await Filesystem.ensureDir(dir)

    t.true(await Filesystem.exists(dir))
  }

  async removeDir (t) {
    const dir = Path.resolve(this.tempDir, 'removeDir')
    await Filesystem.ensureDir(dir)

    t.true(await Filesystem.exists(dir))

    await Filesystem.removeDir(dir)

    t.false(await Filesystem.exists(dir))
  }

  async emptyDir (t) {
    const dir = Path.resolve(this.tempDir, 'emptyDir')
    await Filesystem.ensureDir(dir)

    const file = Path.resolve(dir, 'test.txt')
    await Filesystem.ensureFile(file)

    await Filesystem.emptyDir(dir)

    const dirContent = await Filesystem.readDir(dir)

    t.deepEqual(dirContent, [])
  }

  async chmodAsString (t) {
    const file1 = await this._ensureTempFile()
    await Filesystem.chmod(file1, '400') // read-only

    t.throwsAsync(Filesystem.access(file1, Fs.constants.W_OK))

    const file2 = await this._ensureTempFile()
    await Filesystem.chmod(file2, '600') // read-write
    await Filesystem.access(file2, Fs.constants.W_OK)

    t.pass()
  }

  async chmodAsInteger (t) {
    const file1 = await this._ensureTempFile()
    await Filesystem.chmod(file1, 400) // read-only

    t.throwsAsync(Filesystem.access(file1, Fs.constants.W_OK))

    const file2 = await this._ensureTempFile()
    await Filesystem.chmod(file2, 600) // read-write
    await Filesystem.access(file2, Fs.constants.W_OK)

    t.pass()
  }

  async ensureLink (t) {
    const file = await this._ensureTempFile()
    const link = Path.resolve(this.tempDir, 'links', 'link.txt')
    await Filesystem.ensureLink(file, link)

    const exists = await Filesystem.exists(link)
    t.true(exists)
  }

  async ensureSymlink (t) {
    const file = await this._ensureTempFile()
    const link = Path.resolve(this.tempDir, 'links', 'symlink.txt')
    await Filesystem.ensureSymlink(file, link)

    const exists = await Filesystem.exists(link)
    t.true(exists)
  }

  async lockFile (t) {
    const file = await this._ensureTempFile()
    t.false(await Filesystem.isLocked(file))

    await Filesystem.lockFile(file)
    t.true(await Filesystem.isLocked(file))
  }

  async unlockFile (t) {
    const file = await this._ensureTempFile()
    await Filesystem.lockFile(file)
    t.true(await Filesystem.isLocked(file))

    await Filesystem.unlockFile(file)
    t.false(await Filesystem.isLocked(file))
  }

  async prepareLockFile (t) {
    const withlock = await Filesystem.prepareLockFile(`file.lock`)
    t.true(withlock.includes('.lock'))

    const withoutlock = await Filesystem.prepareLockFile(`file`)
    t.true(withoutlock.includes('.lock'))
  }

  // async todoisFileLocked (t) {}

  async tempFile (t) {
    const file = await Filesystem.tempFile()
    t.not(file, null)
  }

  async tempDirectory (t) {
    const dir = await Filesystem.tempDir()
    t.true(await Filesystem.exists(dir))
  }
}

module.exports = new FilesystemTest()
