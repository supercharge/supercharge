'use strict'

import Fs from 'fs'

export function resolve(specifier, context, defaultResolve) {
  // Normally Node.js would error on specifiers starting with 'https://', so
  // this hook intercepts them and converts them into absolute URLs to be
  // passed along to the later hooks below.

  if (specifier.startsWith('@ioc:')) {
    console.log('specifier with @ioc:');
    console.log({ url: specifier });

    return { url: specifier };
  }

  const isFile = Fs.statSync(specifier).isFile()
  const isMissingJsExtension = !specifier.endsWith('.js')

  if (isFile && isMissingJsExtension) {
    specifier = `${specifier}.js`
  }

  // Let Node.js handle all other specifiers.
  return defaultResolve(specifier, context, defaultResolve);
}

export function getFormat(url, context, defaultGetFormat) {
  console.log('getFormat for da puper');

  // This loader assumes all network-provided JavaScript is ES module code.
  if (url.startsWith('@ioc:')) {
    console.log('starts with @ioc:');
    return { format: 'module' };
  }

  // Let Node.js handle all other URLs.
  return defaultGetFormat(url, context, defaultGetFormat);
}

export function getSource(url, context, defaultGetSource) {
  console.log('getSource with @ioc:');

  // For JavaScript to be loaded over the network, we need to fetch and
  // return it.
  if (url.startsWith('@ioc:')) {
    console.log('foo bar');

    return {
      foo: 'bar'
    }
  }

  // Let Node.js handle all other URLs.
  return defaultGetSource(url, context, defaultGetSource);
}
