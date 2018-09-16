'use strict'

const _ = require('lodash')
const Fs = require('fs-extra')
const Tempy = require('tempy')
const Lockfile = require('lockfile')
const { promisify: Promisify } = require('util')

const lockFile = Promisify(Lockfile.lock)
const unlockFile = Promisify(Lockfile.unlock)
const isFileLocked = Promisify(Lockfile.check)

class Filesystem {
  /**
   * Retrieve information about the given file. Use `access`
   * to check whether the `file` exists instead of `stat`.
   *
   * @param {String} file
   */
  stat (file) {
    return Fs.stat(file)
  }

  /**
   * Test the user's permissions for the given `path` which can
   * be a file or directory. The `mode` argument is an optional
   * integer to specify the accessibility level.
   *
   * @param {String} path  - file or directory path
   * @param {Integer} mode - defaults to `fs.constants.F_OK`
   */
  access (path, mode) {
    return Fs.access(path, mode)
  }

  /**
   * Test whether the given `file` exists on the file system.
   *
   * @param {String} file
   *
   * @returns {Boolean}
   */
  pathExists (file) {
    return Fs.pathExists(file)
  }

  /**
   * Shortcut for `pathExists` to check whether a given file
   * or directory exists on the file system.
   *
   * @param {String} file
   *
   * @returns {Boolean}
   */
  exists (file) {
    return this.pathExists(file)
  }

  /**
   * Ensure that the `file` exists. If the requested file and
   * directories do not exist, they are created. If the file
   * already exists, it is NOT modified.
   *
   * @param {String} file
   */
  ensureFile (file) {
    return Fs.ensureFile(file)
  }

  /**
   * Read the entire content of `file`. If no `encoding` is
   * specified, the raw buffer is returned. If `encoding` is
   * an object, it allows the `encoding` and `flag` options.
   *
   * @param {String} file
   * @param {String|Object} encoding
   */
  readFile (file, encoding = 'utf8') {
    return Fs.readFile(file, encoding)
  }

  /**
   * Read the contents of a directory with the given `path`.
   * Returns an array of the names of the files in the
   * directory excluding `.` and `..`.
   *
   * @param {String} path
   * @param {String} encoding
   */
  readDir (path, encoding) {
    return Fs.readdir(path, encoding)
  }

  /**
   * Write file to a given location if parent
   * directory/directories does not exists
   * they will be created.
   *
   * @param  {String} path
   * @param  {String} content
   * @param  {Object} options
   */
  writeFile (file, content, options) {
    return Fs.outputFile(file, content, options)
  }

  /**
   * Removes a `file` from the file system.
   *
   * @param {String} file
   */
  removeFile (file) {
    return Fs.remove(file)
  }

  /**
   * Copy a file or directory from `src` to `dest`. The
   * directory can have contents. Like `cp -r`. If
   * `src` is a directory this method copies everything
   * inside of `src`, not the entire directory itself.
   *
   * If `src` is a file, make sure that `dest` is a file
   * as well (and not a directory).
   *
   * @param {String} src  - source path
   * @param {String} dest - destination path
   * @param {Object} options
   */
  copy (src, dest, options) {
    return Fs.copy(src, dest, options)
  }

  /**
   * Moves a file or directory from `src` to `dest`. By default,
   * this method doesn't override existingfiles. You can
   * override existing files using `{ override: true }`.
   *
   * @param {String} src  - source path
   * @param {String} dest - destination path
   * @param {Object} options
   */
  move (src, dest, options = {}) {
    return Fs.move(src, dest, options)
  }

  /**
   * Ensures that the directory exists. If the directory
   * structure does not exist, it is created.
   * Like `mkdir -p`.
   *
   * @param {String} dir - directory path
   */
  ensureDir (dir) {
    return Fs.ensureDir(dir)
  }

  /**
   * Removes a `dir` from the file system.The directory
   * can have content. Content in the directory will
   * be removed as well, like `rm -rf`.
   *
   * @param {String} dir - directory path
   */
  removeDir (dir) {
    return Fs.remove(dir)
  }

  /**
   * Ensures that a directory is empty. Deletes directory
   * contents if the directory is not empty. If the
   * directory does not exist, it is created.
   * The directory itself is not deleted.
   *
   * @param {String} dir
   */
  emptyDir (dir) {
    return Fs.emptyDir(dir)
  }

  /**
   * Changes the permissions of a `file`.
   * The `mode` is a numeric bitmask and
   * can be an integer or string.
   *
   * @param {String} file
   * @param {String|Integer} mode
   */
  chmod (file, mode) {
    return Fs.chmod(file, parseInt(mode, 8))
  }

  /**
   * Ensures that the link from source to
   * destination exists. If the directory
   * structure does not exist, it is created.
   *
   * @param {String} src
   * @param {String} dest
   */
  ensureLink (src, dest) {
    return Fs.ensureLink(src, dest)
  }

  /**
   * Ensures that the symlink from source to
   * destination exists. If the directory
   * structure does not exist, it is created.
   *
   * @param {String} src
   * @param {String} dest
   * @param {String} type
   */
  ensureSymlink (src, dest, type) {
    return Fs.ensureSymlink(src, dest, type)
  }

  /**
   * Acquire a file lock on the specified `file` path.
   *
   * @param {String} file
   * @param {Object} options
   */
  lockFile (file, options = {}) {
    return lockFile(this.prepareLockFile(file), options)
  }

  /**
   * Close and unlink the lockfile.
   *
   * @param {String} file
   */
  unlockFile (file) {
    return unlockFile(this.prepareLockFile(file))
  }

  /**
   * Check if the lockfile is locked and not stale.
   *
   * @param {String} file
   * @param {Object} options
   *
   * @returns {Boolean}
   */
  isLocked (file, options = {}) {
    return isFileLocked(this.prepareLockFile(file), options)
  }

  /**
   * Append the `.lock` suffix to the file name
   * if not existent.
   *
   * @param {String} file
   *
   * @returns {String}
   */
  prepareLockFile (file) {
    return _.endsWith(file, '.lock') ? file : `${file}.lock`
  }

  /**
   * Create a random temporary file path
   * you can write to.
   *
   * @param {Object} options
   */
  async tempFile ({ extension, name } = {}) {
    return Tempy.file({ extension, name })
  }

  /**
   * Create a temporary directory path.
   * The directory is created for you.
   */
  async tempDir () {
    return Tempy.directory()
  }
}

module.exports = new Filesystem()
