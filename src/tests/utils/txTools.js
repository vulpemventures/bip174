'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const liquidjs_lib_1 = require('liquidjs-lib');
const tools_1 = require('../../lib/converter/tools');
function getDefaultTx(version = 1) {
  const TX = new Transaction(Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  TX.tx.version = version;
  return TX;
}
exports.getDefaultTx = getDefaultTx;
exports.transactionFromBuffer = buffer => new Transaction(buffer);
class Transaction {
  constructor(buffer) {
    this.tx = liquidjs_lib_1.Transaction.fromBuffer(buffer);
    if (this.tx.ins.some(input => input.script.length !== 0)) {
      throw new Error('Format Error: Transaction ScriptSigs are not empty');
    }
  }
  getInputOutputCounts() {
    return {
      inputCount: this.tx.ins.length,
      outputCount: this.tx.outs.length,
    };
  }
  addInput(input) {
    if (
      input.hash === undefined ||
      input.index === undefined ||
      (!Buffer.isBuffer(input.hash) && typeof input.hash !== 'string') ||
      typeof input.index !== 'number'
    ) {
      throw new Error('Error adding input.');
    }
    const hash =
      typeof input.hash === 'string'
        ? tools_1.reverseBuffer(Buffer.from(input.hash, 'hex'))
        : input.hash;
    const script = input.script ? input.script : Buffer.alloc(0);
    this.tx.addInput(hash, input.index, input.sequence, script, input.issuance);
  }
  addOutput(output) {
    if (
      output.script === undefined ||
      output.value === undefined ||
      !Buffer.isBuffer(output.script) ||
      !Buffer.isBuffer(output.value)
    ) {
      throw new Error('Error adding output.');
    }
    this.tx.addOutput(output.script, output.value, output.asset, output.nonce);
  }
  toBuffer() {
    return this.tx.toBuffer();
  }
}
