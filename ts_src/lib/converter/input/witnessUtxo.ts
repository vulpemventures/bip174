import { KeyValue, WitnessUtxo } from '../../interfaces';
import { InputTypes } from '../../typeFields';
import * as varuint from '../varint';

export function decode(keyVal: KeyValue): WitnessUtxo {
  if (keyVal.key[0] !== InputTypes.WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode witnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  let _offset = 0;
  let _next = 33;
  const asset = keyVal.value.slice(_offset, _next);
  _offset = _next;
  _next += 1;
  const prefix = keyVal.value.slice(_offset, _next);
  _offset = _next;
  _next += prefix[0] === 1 ? 8 : 32;
  const value = Buffer.concat([prefix, keyVal.value.slice(_offset, _next)]);
  _offset = _next;
  _next += 1;
  const nPrefix = keyVal.value.slice(_offset, _next);
  let nonce = nPrefix;
  if (nPrefix[0] !== 0) {
    _offset = _next;
    _next += 32;
    nonce = keyVal.value.slice(_offset, _next);
  }
  _offset = _next;
  const scriptLen = varuint.decode(keyVal.value, _offset);
  _offset += varuint.encodingLength(scriptLen);
  const script = keyVal.value.slice(_offset);
  if (script.length !== scriptLen) {
    throw new Error('Decode Error: WITNESS_UTXO script is not proper length');
  }
  return {
    script,
    value,
    asset,
    nonce,
  };
}

export function encode(data: WitnessUtxo): KeyValue {
  const { script, value, asset, nonce } = data;
  const assetLen = 33;
  const nonceLen = nonce[0] === 0 ? 1 : 33;
  const valueLen = value[0] === 1 ? 9 : 33;
  const varintLen = varuint.encodingLength(script.length);
  const result = Buffer.allocUnsafe(
    assetLen + nonceLen + valueLen + varintLen + script.length,
  );

  let resultLen = 0;
  asset.copy(result, resultLen);
  resultLen += assetLen;
  value.copy(result, resultLen);
  resultLen += valueLen;
  nonce.copy(result, resultLen);
  resultLen += nonceLen;
  varuint.encode(script.length, result, resultLen);
  resultLen += varintLen;
  script.copy(result, resultLen);
  return {
    key: Buffer.from([InputTypes.WITNESS_UTXO]),
    value: result,
  };
}

export const expected =
  '{ script: Buffer; value: Buffer; asset: Buffer; nonce: Buffer; }';
export function check(data: any): data is WitnessUtxo {
  return (
    Buffer.isBuffer(data.script) &&
    Buffer.isBuffer(data.value) &&
    Buffer.isBuffer(data.asset) &&
    Buffer.isBuffer(data.nonce)
  );
}

export function canAdd(currentData: any, newData: any): boolean {
  return (
    !!currentData &&
    !!newData &&
    currentData.witnessUtxo === undefined &&
    currentData.nonWitnessUtxo === undefined
  );
}
