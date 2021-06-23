import * as test from 'tape';
import * as witnessUtxo from '../lib/converter/input/witnessUtxo';

test('witnessUtxo encode', t => {
  const witness = {
    asset: Buffer.from(
      '015ac9f65c0efcc4775e0baec4ec03abdde22473cd3cf33c0419ca290e0751b225',
      'hex',
    ),
    value: Buffer.from('010000000000000010', 'hex'),
    nonce: Buffer.from('00', 'hex'),
    surjectionProof: undefined,
    rangeProof: undefined,
    script: Buffer.from('0014ea273029aa016b4ede5688ebbface3eccb769e06'),
  };

  const keyVal = witnessUtxo.encode(witness);

  t.deepEqual(witnessUtxo.decode(keyVal), witness);
  t.end();
});
