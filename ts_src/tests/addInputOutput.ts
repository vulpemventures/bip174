import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { getDefaultTx, transactionFromBuffer } from './utils/txTools';

tape('Test: add Input Output', t => {
  const psbt = new Psbt(getDefaultTx());
  psbt.addInput({
    hash: '865dce988413971fd812d0e81a3395ed916a87ea533e1a16c0f4e15df96fa7d4',
    index: 3,
  });
  psbt.addInput({
    hash: 'ff5dce988413971fd812d0e81a3395ed916a87ea533e1a16c0f4e15df96fa7d4',
    index: 1,
  });
  psbt.addOutput({
    script: Buffer.from(
      'a914e18870f2c297fbfca54c5c6f645c7745a5b66eda87',
      'hex',
    ),
    value: Buffer.from('0100000000499602d2', 'hex'),
    asset: Buffer.from(
      '0125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a',
      'hex',
    ),
    nonce: Buffer.from('00', 'hex'),
  });
  psbt.addOutput({
    script: Buffer.from(
      'a914e18870f2c297fbfca54c5c6f645c7745a5b66eda87',
      'hex',
    ),
    value: Buffer.from('01000000003ade68b1', 'hex'),
    asset: Buffer.from(
      '0125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a',
      'hex',
    ),
    nonce: Buffer.from('00', 'hex'),
  });
  const hex = psbt.toHex();
  const hex2 = Psbt.fromHex(hex, transactionFromBuffer).toHex();
  t.equal(
    hex,
    '70736274ff0100e3010000000002d4a76ff95de1f4c0161a3e53ea876a91ed95331ae8d' +
      '012d81f97138498ce5d860300000000ffffffffd4a76ff95de1f4c0161a3e53ea876a91' +
      'ed95331ae8d012d81f97138498ce5dff0100000000ffffffff020125b251070e29ca190' +
      '43cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a0100000000499602d20017a9' +
      '14e18870f2c297fbfca54c5c6f645c7745a5b66eda870125b251070e29ca19043cf33cc' +
      'd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a01000000003ade68b10017a914e18870' +
      'f2c297fbfca54c5c6f645c7745a5b66eda87000000000000000000',
  );
  t.equal(hex, hex2);

  // console.log(jsonA1);
  // console.log(jsonA2);
  // console.log(jsonB1);
  // console.log(jsonB2);

  // t.notDeepEqual(JSON.parse(jsonA1), JSON.parse(jsonB1));
  // t.deepEqual(JSON.parse(jsonA2), JSON.parse(jsonB2));
  t.end();
});
