'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test = require('tape');
const witnessUtxo = require('../lib/converter/input/witnessUtxo');
test('witnessUtxo encode', t => {
  const witnesses = [
    // unconfidential
    {
      asset: Buffer.alloc(33),
      value: Buffer.concat([Buffer.from('01', 'hex'), Buffer.alloc(8)]),
      nonce: Buffer.alloc(1),
      script: Buffer.alloc(20),
      rangeProof: undefined,
      surjectionProof: undefined,
    },
    // confidential w/ proofs
    {
      asset: Buffer.alloc(33),
      value: Buffer.alloc(33),
      nonce: Buffer.concat([Buffer.from('01', 'hex'), Buffer.alloc(32)]),
      script: Buffer.alloc(20),
      rangeProof: Buffer.alloc(4174),
      surjectionProof: Buffer.alloc(67),
    },
    // confidential w/ "empty" proofs
    {
      asset: Buffer.alloc(33),
      value: Buffer.alloc(33),
      nonce: Buffer.concat([Buffer.from('01', 'hex'), Buffer.alloc(32)]),
      script: Buffer.alloc(20),
      rangeProof: Buffer.alloc(1),
      surjectionProof: Buffer.alloc(1),
    },
    // confidential w/o proofs
    {
      asset: Buffer.alloc(33),
      value: Buffer.alloc(33),
      nonce: Buffer.concat([Buffer.from('01', 'hex'), Buffer.alloc(32)]),
      script: Buffer.alloc(20),
      rangeProof: Buffer.alloc(0),
      surjectionProof: Buffer.alloc(0),
    },
  ];
  witnesses.forEach(witness => {
    const keyVal = witnessUtxo.encode(witness);
    t.deepEqual(witnessUtxo.decode(keyVal), witness);
  });
  t.end();
});
