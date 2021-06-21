'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const utils_1 = require('../lib/utils');
tape('defaultLockTimeSetter', t => {
  tape('should throw an error if the buffer is byteLenght < 4', q => {
    const buffer = Buffer.from('000000', 'hex');
    q.throws(() => utils_1.defaultLocktimeSetter(10, buffer));
    q.end();
  });
  tape('should throw an error if txBuffer is not a buffer', q => {
    const notABuffer = [];
    q.throws(() => utils_1.defaultLocktimeSetter(10, notABuffer));
    q.end();
  });
  tape('should write the locktime in buffer', q => {
    const buffer = Buffer.from('00000000', 'hex');
    const resBuf = utils_1.defaultLocktimeSetter(1, buffer);
    q.strictEqual(resBuf.toString('hex'), '01000000');
    q.end();
  });
  t.end();
});
tape('defaultVersionSetter', t => {
  tape('should throw an error if the buffer is byteLenght < 4', q => {
    const buffer = Buffer.from('000000', 'hex');
    q.throws(() => utils_1.defaultVersionSetter(10, buffer));
    q.end();
  });
  tape('should throw an error if txBuffer is not a buffer', q => {
    const notABuffer = [];
    q.throws(() => utils_1.defaultVersionSetter(10, notABuffer));
    q.end();
  });
  tape('should write the version in buffer if everything is ok', q => {
    const buffer = Buffer.from('00000000', 'hex');
    const resBuf = utils_1.defaultVersionSetter(1, buffer);
    q.strictEqual(resBuf.toString('hex'), '01000000');
    q.end();
  });
  t.end();
});
tape('inputCheckUncleanFinalized', t => {
  tape(
    'should throw an error if there is not enough data to clean in PsbtInput',
    q => {
      const input = {
        witnessUtxo: {
          script: Buffer.alloc(1),
          value: Buffer.alloc(1),
          asset: Buffer.alloc(1),
          nonce: Buffer.alloc(1),
        },
        redeemScript: Buffer.from('iamaredeemscript', 'hex'),
      };
      q.throws(() => utils_1.inputCheckUncleanFinalized(1, input));
      q.end();
    },
  );
  t.end();
});
