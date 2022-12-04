import {copyScssConfig} from './copy-scss-config';
import copy from 'recursive-copy';
import {chartsConfig} from './_build.config';

export function copyChartScss(): Promise<any> {
  return new Promise((resolve, reject) => {
    copy(
      `${chartsConfig.config.packagePath}`,
      `${chartsConfig.config.outputs}`,
      copyScssConfig
    )
      .on(copy.events.COPY_FILE_START, function (copyOperation) {
        console.info('Copying file ' + copyOperation.src + '...');
      })
      .on(copy.events.COPY_FILE_COMPLETE, function (copyOperation) {
        console.info('Copied to ' + copyOperation.dest);
      })
      .on(copy.events.ERROR, function (error, copyOperation) {
        console.error('Unable to copy ' + copyOperation.dest);
      })
      .then(function (results) {
        console.info(results.length + ' file(s) copied');
        resolve(true);
      })
      .catch(function (error) {
        reject(true);
        return console.error('Copy failed: ' + error);
      });
  });
}
