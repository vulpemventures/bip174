'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const combine_1 = require('./fixtures/combine');
const txTools_1 = require('./utils/txTools');
for (const f of combine_1.fixtures) {
  tape('Test: ' + f.description, t => {
    const psbts = f.psbts.map(p =>
      psbt_1.Psbt.fromHex(p, txTools_1.transactionFromBuffer),
    );
    const strBefore = txTools_1.jsonify(psbts[0]);
    const strSecondBefore = txTools_1.jsonify(psbts[1]);
    psbts[0].combine(psbts[1]);
    const strAfter = txTools_1.jsonify(psbts[0]);
    const strSecondAfter = txTools_1.jsonify(psbts[1]);
    t.notDeepEqual(JSON.parse(strBefore), JSON.parse(strAfter));
    t.deepEqual(JSON.parse(strSecondBefore), JSON.parse(strSecondAfter));
    t.equal(psbts[0].toHex(), f.result);
    t.end();
  });
}
