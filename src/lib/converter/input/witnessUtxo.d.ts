import { KeyValue, WitnessUtxo } from '../../interfaces';
export declare function decode(keyVal: KeyValue): WitnessUtxo;
export declare function encode(data: WitnessUtxo): KeyValue;
export declare const expected = "{ script: Buffer; value: Buffer; asset: Buffer; nonce: Buffer; rangeProof?: Buffer; surjectionProof?: Buffer }";
export declare function check(data: any): data is WitnessUtxo;
export declare function canAdd(currentData: any, newData: any): boolean;
//# sourceMappingURL=witnessUtxo.d.ts.map