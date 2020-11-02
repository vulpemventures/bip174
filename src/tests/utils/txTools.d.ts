/// <reference types="node" />
import { Transaction as BTransaction } from 'liquidjs-lib';
import { Transaction as ITransaction, TransactionFromBuffer } from '../../lib/interfaces';
export declare function toValueBuffer(value: number): Buffer;
export declare function getDefaultTx(version?: number): Transaction;
export declare const transactionFromBuffer: TransactionFromBuffer;
declare class Transaction implements ITransaction {
    tx: BTransaction;
    constructor(buffer: Buffer);
    getInputOutputCounts(): {
        inputCount: number;
        outputCount: number;
    };
    addInput(input: any): void;
    addOutput(output: any): void;
    toBuffer(): Buffer;
}
export {};
