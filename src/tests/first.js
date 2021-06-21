'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const assert = require('assert');
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const first_1 = require('./fixtures/first');
const txTools_1 = require('./utils/txTools');
for (const f of first_1.fixtures) {
  tape('Test: ' + f.description, t => {
    const parsed = psbt_1.Psbt.fromHex(
      f.input,
      txTools_1.transactionFromBuffer,
    );
    const hex = parsed.toHex();
    const parsed2 = psbt_1.Psbt.fromHex(hex, txTools_1.transactionFromBuffer);
    const hex2 = parsed2.toHex();
    const parsed3 = psbt_1.Psbt.fromHex(hex2, txTools_1.transactionFromBuffer);
    const expectedRangeProof = f.output.inputs.map(input =>
      Buffer.from(input.witnessUtxo.rangeProof, 'hex'),
    );
    const expectedSurjectionProof = f.output.inputs.map(input =>
      Buffer.from(input.witnessUtxo.surjectionProof, 'hex'),
    );
    assert.deepStrictEqual(
      parsed.inputs.map((input, index) =>
        input.witnessUtxo.rangeProof.equals(expectedRangeProof[index]),
      ),
      expectedRangeProof.map(_ => true),
    );
    assert.deepStrictEqual(
      parsed.inputs.map((input, index) =>
        input.witnessUtxo.surjectionProof.equals(
          expectedSurjectionProof[index],
        ),
      ),
      expectedSurjectionProof.map(_ => true),
    );
    t.strictEqual(parsed.toHex(), parsed2.toHex());
    t.strictEqual(parsed.toHex(), parsed3.toHex());
    t.equal(hex, hex2);
    t.end();
  });
}
