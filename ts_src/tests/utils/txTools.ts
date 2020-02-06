import { Transaction as BTransaction } from 'liquidjs-lib';
import { reverseBuffer } from '../../lib/converter/tools';
import {
  Transaction as ITransaction,
  TransactionFromBuffer,
} from '../../lib/interfaces';

export function getDefaultTx(version: number = 1): Transaction {
  const TX = new Transaction(Buffer.from([2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  TX.tx.version = version;
  return TX;
}

export const transactionFromBuffer: TransactionFromBuffer = (
  buffer: Buffer,
): Transaction => new Transaction(buffer);

class Transaction implements ITransaction {
  tx: BTransaction;
  constructor(buffer: Buffer) {
    this.tx = BTransaction.fromBuffer(buffer);
    if (this.tx.ins.some(input => input.script.length !== 0)) {
      throw new Error('Format Error: Transaction ScriptSigs are not empty');
    }
  }

  getInputOutputCounts(): {
    inputCount: number;
    outputCount: number;
  } {
    return {
      inputCount: this.tx.ins.length,
      outputCount: this.tx.outs.length,
    };
  }

  addInput(input: any): void {
    if (
      (input as any).hash === undefined ||
      (input as any).index === undefined ||
      (!Buffer.isBuffer((input as any).hash) &&
        typeof (input as any).hash !== 'string') ||
      typeof (input as any).index !== 'number'
    ) {
      throw new Error('Error adding input.');
    }
    const hash =
      typeof input.hash === 'string'
        ? reverseBuffer(Buffer.from(input.hash, 'hex'))
        : input.hash;
    const script = input.script ? input.script : Buffer.alloc(0);
    this.tx.addInput(hash, input.index, input.sequence, script, input.issuance);
  }

  addOutput(output: any): void {
    if (
      (output as any).script === undefined ||
      (output as any).value === undefined ||
      !Buffer.isBuffer((output as any).script) ||
      !Buffer.isBuffer((output as any).value)
    ) {
      throw new Error('Error adding output.');
    }
    this.tx.addOutput(output.script, output.value, output.asset, output.nonce);
  }

  toBuffer(): Buffer {
    return this.tx.toBuffer();
  }
}
