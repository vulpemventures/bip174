import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/combine';
import { jsonify, transactionFromBuffer } from './utils/txTools';

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const psbts = f.psbts.map(p => Psbt.fromHex(p, transactionFromBuffer));
    console.log(psbts.map(p => p.inputs[0]));
    const strBefore = jsonify(psbts[0]);
    const strSecondBefore = jsonify(psbts[1]);
    psbts[0].combine(psbts[1]);
    const strAfter = jsonify(psbts[0]);
    const strSecondAfter = jsonify(psbts[1]);

    t.notDeepEqual(JSON.parse(strBefore), JSON.parse(strAfter));
    t.deepEqual(JSON.parse(strSecondBefore), JSON.parse(strSecondAfter));
    t.equal(psbts[0].toHex(), f.result);
    t.end();
  });
}
