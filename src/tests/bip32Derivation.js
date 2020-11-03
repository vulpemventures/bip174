'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const bip32Derivation_1 = require('../lib/converter/shared/bip32Derivation');
tape('BIP32Derivation', t => {
  tape('make converter', q => {
    let converter = {};
    converter = bip32Derivation_1.makeConverter(2);
    q.notDeepEqual(converter, {});
    q.end();
  });
  const keyVal = {
    key: Buffer.from(
      '02041045d0af4528ccf6627650574f71ed46a642ee00f131' +
        'e4b223c0036915810060d19682b0d1f89f73bfe8756335' +
        '9880b67c49e408df089627a93abe9512cc6dd2',
      'hex',
    ),
    value: Buffer.from('01000000', 'hex'),
  };
  tape(
    'converter decode function should decode a valid keyVal to Bip32Derivation',
    q => {
      const converter = bip32Derivation_1.makeConverter(2);
      const data = converter.decode(keyVal);
      q.strictEqual(
        data.pubkey.toString('hex'),
        '041045d0af4528ccf6627650574f71ed46a642ee00f131' +
          'e4b223c0036915810060d19682b0d1f89f73bfe8756335' +
          '9880b67c49e408df089627a93abe9512cc6dd2',
      );
      q.strictEqual(data.masterFingerprint.toString('hex'), '01000000');
      q.end();
    },
  );
  tape(
    'converter decode should throw an error if the first byte of key is different of converter TYPE_BYTE',
    q => {
      const converter = bip32Derivation_1.makeConverter(4);
      q.throws(() => converter.decode(keyVal));
      q.end();
    },
  );
  tape(
    'converter decode should fail if the value of KeyVal is not a multiple of 4',
    q => {
      const converter = bip32Derivation_1.makeConverter(2);
      const invalidKeyVal = Object.assign({}, keyVal, {
        value: Buffer.from('01', 'hex'),
      });
      q.throws(() => converter.decode(invalidKeyVal));
      q.end();
    },
  );
  tape(
    'converter decode should fail if the key of KeyVal is not of the right length',
    q => {
      const converter = bip32Derivation_1.makeConverter(2);
      const invalidKeyVal = Object.assign({}, keyVal, {
        key: Buffer.from('0200000000', 'hex'),
      });
      q.throws(() => converter.decode(invalidKeyVal));
      q.end();
    },
  );
  tape(
    'converter encode function should encode a Bip32Derivation as a valid KeyVal',
    q => {
      const converter = bip32Derivation_1.makeConverter(2);
      const data = {
        masterFingerprint: Buffer.from('01000000', 'hex'),
        path: 'm',
        pubkey: Buffer.from(
          '041045d0af4528ccf6627650574f71ed46a642ee00f131' +
            'e4b223c0036915810060d19682b0d1f89f73bfe8756335' +
            '9880b67c49e408df089627a93abe9512cc6dd2',
          'hex',
        ),
      };
      const result = converter.encode(data);
      q.strictEqual(result.key.toString('hex'), keyVal.key.toString('hex'));
      q.strictEqual(result.value.toString('hex'), keyVal.value.toString('hex'));
      q.end();
    },
  );
  t.end();
});
