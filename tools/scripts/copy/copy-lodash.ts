// https://www.npmjs.com/package/recursive-copy
import {CopyConfig, copyFiles} from './copy-files';
import {execSync} from 'child_process';


export const copyLodashConfig: CopyConfig = {
  source: '../lodash',
  dest: 'libs/packages/fn/src/lib/lodash',
  options: {
    overwrite: true,
    expand: true,
    // dot: false,
    // junk: true,
    filter: ['**/*.ts', '!node_modules/**/*', '!test/**/*'],
    // rename: function (filePath: string) {
    //   return `${filePath}__template__`;
    // }
    // transform: function(src, dest, stats) {
    //   if (path.extname(src) !== '.txt') { return null; }
    //   return through(function(chunk, enc, done)  {
    //     var output = chunk.toString().toUpperCase();
    //     done(null, output);
    //   });
    // }
  }
};

export const copyLodashInternalConfig: CopyConfig = {
  source: '../lodash/.internal',
  dest: 'libs/packages/fn/src/lib/lodash/.internal',
  options: {
    overwrite: true,
    expand: true,
    // dot: false,
    // junk: true,
    filter: ['**/*.ts', '!node_modules/**/*', '!test/**/*'],
    // rename: function (filePath: string) {
    //   return `${filePath}__template__`;
    // }
    // transform: function(src, dest, stats) {
    //   if (path.extname(src) !== '.txt') { return null; }
    //   return through(function(chunk, enc, done)  {
    //     var output = chunk.toString().toUpperCase();
    //     done(null, output);
    //   });
    // }
  }
};

export async function copyLodashFiles() {
  execSync(`rm -rf ${copyLodashConfig.dest}`);
  await copyFiles(copyLodashInternalConfig);
  return await copyFiles(copyLodashConfig);
}