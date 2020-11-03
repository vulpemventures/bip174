'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const tools_1 = require('../lib/converter/tools');
tape('readUint64LE', t => {
  tape('should read the Uint64 (with offset = 0)', q => {
    const result = tools_1.readUInt64LE(
      Buffer.from('0000000000000000', 'hex'),
      0,
    );
    q.strictEqual(result, 0);
    q.end();
  });
  tape('should read the Uint64 (with offset > 0)', q => {
    const result = tools_1.readUInt64LE(
      Buffer.from('ff' + '0000000000000000', 'hex'),
      1,
    );
    q.strictEqual(result, 0);
    q.end();
  });
  t.end();
});
tape('writeUint64LE', t => {
  tape('should write the Uint64 (with offset = 0)', q => {
    const expected = Buffer.from('0100000000000000', 'hex');
    const bufferToWrite = Buffer.from('0000000000000000', 'hex');
    const result = tools_1.writeUInt64LE(bufferToWrite, 1, 0);
    q.strictEqual(expected.equals(bufferToWrite), true);
    q.strictEqual(result, 8);
    q.end();
  });
  tape('should write the Uint64 (with offset > 0)', q => {
    const expected = Buffer.from('ff' + '0100000000000000', 'hex');
    const bufferToWrite = Buffer.from('ff' + '0000000000000000', 'hex');
    const result = tools_1.writeUInt64LE(bufferToWrite, 1, 1);
    console.log(bufferToWrite);
    q.strictEqual(expected.equals(bufferToWrite), true);
    q.strictEqual(result, 8 + 1);
    q.end();
  });
  tape('should throw an error if the value is < 0', q => {
    const bufferToWrite = Buffer.from('ff' + '0000000000000000', 'hex');
    q.throws(() => tools_1.writeUInt64LE(bufferToWrite, -66, 0));
    q.end();
  });
  t.end();
});
