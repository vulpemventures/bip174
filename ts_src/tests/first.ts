import * as assert from 'assert';
import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/first';
import { transactionFromBuffer } from './utils/txTools';

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const parsed = Psbt.fromHex(f.input, transactionFromBuffer);
    const hex = parsed.toHex();
    const parsed2 = Psbt.fromHex(hex, transactionFromBuffer);
    const hex2 = parsed2.toHex();
    const parsed3 = Psbt.fromHex(hex2, transactionFromBuffer);

    const expectedRangeProof = f.output.inputs.map(input =>
      Buffer.from(input.witnessUtxo.rangeProof, 'hex'),
    );

    const expectedSurjectionProof = f.output.inputs.map(input =>
      Buffer.from(input.witnessUtxo.surjectionProof, 'hex'),
    );

    assert.deepStrictEqual(
      parsed.inputs.map((input: any, index: number) =>
        input.witnessUtxo.rangeProof.equals(expectedRangeProof[index]),
      ),
      expectedRangeProof.map(_ => true),
    );

    assert.deepStrictEqual(
      parsed.inputs.map((input: any, index: number) =>
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
