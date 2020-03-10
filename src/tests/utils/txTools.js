'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const liquidjs_lib_1 = require('liquidjs-lib');
const tools_1 = require('../../lib/converter/tools');
function getDefaultTx(version = 2) {
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
    const hash =
      typeof input.hash === 'string'
        ? tools_1.reverseBuffer(Buffer.from(input.hash, 'hex'))
        : input.hash;
    this.tx.addInput(hash, input.index, input.sequence);
  }
  addOutput(output) {
    this.tx.addOutput(output.script, output.value, output.asset, output.nonce);
  }
  toBuffer() {
    return this.tx.toBuffer();
  }
}
exports.Transaction = Transaction;
