import { confidential } from 'liquidjs-lib';

const satoshiToConfidentialValue = confidential.satoshiToConfidentialValue;

const dummyPubkey = (): Buffer =>
  Buffer.from(
    '03b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd46',
    'hex',
  );
const dummyXpub = (): Buffer =>
  Buffer.from(
    '0488b21e034a346d9880000000032e6467810075260ee7a831189d814e656a300ab7f9a' +
      '151b7377efffe91051103b034ec32baa6c3c05481a9d15c6ee6c48a9692e18285c174d4' +
      '14718f85670e22',
    'hex',
  );
const dummySig = (): Buffer =>
  Buffer.from(
    '304302200424b58effaaa694e1559ea5c93bbfd4a89064224055cdf070b6' +
      '771469442d07021f5c8eb0fea6516d60b8acb33ad64ede60e8785bfb3aa9' +
      '4b99bdf86151db9a9a01',
    'hex',
  );
const dummy4Byte = (): Buffer => Buffer.from([1, 2, 3, 4]);

export const fixtures = {
  valid: [
    {
      method: 'updateGlobal',
      addInputOutput: true,
      args: [
        {
          globalXpub: [
            {
              masterFingerprint: dummy4Byte(),
              extendedPubkey: dummyXpub(),
              path: "m/4'/5/7",
            },
          ],
        },
      ],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA/' +
        '////wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Y' +
        'hw8sKX+/ylTFxvZFx3RaW2btqHAAAAAE8BBIiyHgNKNG2YgAAAAAMuZGeBAHUmDueoMRi' +
        'dgU5lajAKt/mhUbc3fv/+kQURA7A07DK6psPAVIGp0Vxu5sSKlpLhgoXBdNQUcY+FZw4i' +
        'EAECAwQEAACABQAAAAcAAAAAAAA=',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { nonWitnessUtxo: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA/' +
        '////wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Y' +
        'hw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABAAMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          witnessUtxo: {
            script: Buffer.from([1, 2, 3]),
            value: satoshiToConfidentialValue(1234567890),
            asset: Buffer.concat([
              Buffer.alloc(1, 1),
              Buffer.from(
                '1f91920948cdb31244b795cdfef87f5139adfcf8b743ce549d91ebc68ced19f8',
                'hex',
              ),
            ]),
            nonce: Buffer.from('00', 'hex'),
          },
        },
      ],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA///' +
        '//wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw8s' +
        'KX+/ylTFxvZFx3RaW2btqHAAAAAAABAS8BH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrx' +
        'oztGfgBAAAAAEmWAtIAAwECAwAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        { partialSig: [{ pubkey: dummyPubkey(), signature: dummySig() }] },
      ],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAiAgOxNBzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdU' +
        'GEQ1W9RkYwQwIgBCS1jv+qppThVZ6lyTu/1KiQZCJAVc3wcLZ3FGlELQcCH1yOsP6mUW1g' +
        'uKyzOtZO3mDoeFv7OqlLmb34YVHbmpoBIgIDsf8cy6doO2r08SOM1ul+cWfVafrEfx5I1H' +
        'VBhENVvUZGMEMCIAQktY7/qqaU4VWepck7v9SokGQiQFXN8HC2dxRpRC0HAh9cjrD+plFt' +
        'YLisszrWTt5g6Hhb+zqpS5m9+GFR25qaAQAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { sighashType: 1 }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABAwQBAAAAAAA=',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { redeemScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABBAMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { witnessScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABBQMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              masterFingerprint: dummy4Byte(),
              path: 'm/3',
              pubkey: dummyPubkey(),
            },
          ],
        },
      ],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA/' +
        '////wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Y' +
        'hw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAiBgOxNBzLp2g7avTxI4zW6X5xZ9Vp+sR/Hkj' +
        'UdUGEQ1W9RggBAgMEAwAAAAAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptSig: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA/' +
        '////wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Y' +
        'hw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABBwMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptWitness: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABCAMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { porCommitment: 'test' }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABCQR0ZXN0AAA=',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { redeemScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAAQADAQIDAA==',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { witnessScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA///' +
        '//wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw8s' +
        'KX+/ylTFxvZFx3RaW2btqHAAAAAAAAAQEDAQIDAA==',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              masterFingerprint: dummy4Byte(),
              path: 'm/3',
              pubkey: dummyPubkey(),
            },
          ],
        },
      ],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgM' +
        'AAAAA/////wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU' +
        '4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAIgIDsTQcy6doO2r08SOM1ul+cWfVafrEfx5I1' +
        'HVBhENVvUYIAQIDBAMAAAAiAgOx/xzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RggBAg' +
        'MEAwAAAAA=',
    },
    {
      method: 'addUnknownKeyValToGlobal',
      addInputOutput: true,
      args: [{ key: Buffer.from([255]), value: Buffer.from([255]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA///' +
        '//wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw8s' +
        'KX+/ylTFxvZFx3RaW2btqHAAAAAAH/Af8AAAA=',
    },
    {
      method: 'addUnknownKeyValToInput',
      addInputOutput: true,
      args: [0, { key: Buffer.from([255]), value: Buffer.from([255]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAB/wH/AAA=',
    },
    {
      method: 'addUnknownKeyValToOutput',
      addInputOutput: true,
      args: [0, { key: Buffer.from([255]), value: Buffer.from([255]) }],
      expected:
        'cHNldP8BAHcBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wEBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw' +
        '8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAAf8B/wA=',
    },
    {
      method: 'addInput',
      addInputOutput: true,
      args: [
        {
          hash:
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
          index: 1,
        },
      ],
      expected:
        'cHNldP8BAKABAAAAAALUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA//' +
        '///wAPDg0MCwoJCAcGBQQDAgEADw4NDAsKCQgHBgUEAwIBAQAAAAD/////AQEfkZIJSM2z' +
        'EkS3lc3++H9ROa38+LdDzlSdkevGjO0Z+AEAAAAASZYC0gAXqRThiHDywpf7/KVMXG9kXH' +
        'dFpbZu2ocAAAAAAAAAAA==',
    },
    {
      method: 'addOutput',
      addInputOutput: true,
      args: [
        {
          asset: Buffer.concat([
            Buffer.alloc(1, 1),
            Buffer.from(
              '1f91920948cdb31244b795cdfef87f5139adfcf8b743ce549d91ebc68ced19f8',
              'hex',
            ),
          ]),
          script: Buffer.from(
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
            'hex',
          ),
          value: satoshiToConfidentialValue(3),
          nonce: Buffer.from('00', 'hex'),
        },
      ],
      expected:
        'cHNldP8BAMMBAAAAAAHUp2/5XeH0wBYaPlPqh2qR7ZUzGujQEtgflxOEmM5dhgMAAAAA/////' +
        'wIBH5GSCUjNsxJEt5XN/vh/UTmt/Pi3Q85UnZHrxoztGfgBAAAAAEmWAtIAF6kU4Yhw8sKX+/' +
        'ylTFxvZFx3RaW2btqHAR+RkglIzbMSRLeVzf74f1E5rfz4t0POVJ2R68aM7Rn4AQAAAAAAAAA' +
        'DACABAgMEBQYHCAkKCwwNDg8AAQIDBAUGBwgJCgsMDQ4PAAAAAAAAAAAA',
    },
  ],
  invalid: [
    {
      method: 'updateGlobal',
      addInputOutput: true,
      twice: false,
      args: [
        {
          globalXpub: 4,
        },
      ],
      exception: 'Key type globalXpub must be an array',
    },
    {
      method: 'updateGlobal',
      addInputOutput: true,
      twice: false,
      args: [
        {
          globalXpub: [4],
        },
      ],
      exception:
        'Data for global key globalXpub is incorrect: Expected { ' +
        'masterFingerprint: Buffer; extendedPubkey: Buffer; path: string; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: false,
      args: [0, { nonWitnessUtxo: 'blah' }],
      exception:
        'Data for input key nonWitnessUtxo is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [0, { nonWitnessUtxo: dummy4Byte() }],
      exception: 'Can not add duplicate data to input',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          witnessUtxo: { scripty: Buffer.from([1, 2, 3]), vyalue: 1234567890 },
        },
      ],
      exception: 'script: Buffer; value: Buffer; asset: Buffer; nonce: Buffer;',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        {
          witnessUtxo: {
            script: Buffer.from([1, 2, 3]),
            value: satoshiToConfidentialValue(1234567890),
            nonce: Buffer.from('00', 'hex'),
            asset: Buffer.concat([
              Buffer.alloc(1, 1),
              Buffer.from(
                '1f91920948cdb31244b795cdfef87f5139adfcf8b743ce549d91ebc68ced19f8',
                'hex',
              ),
            ]),
          },
        },
      ],
      exception: 'Can not add duplicate data to input',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        { partialSig: [{ pubkdey: dummyPubkey(), signdature: dummySig() }] },
      ],
      exception:
        'Data for input key partialSig is incorrect: Expected { pubkey: ' +
        'Buffer; signature: Buffer; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { sighashType: 'a' }],
      exception:
        'Data for input key sighashType is incorrect: Expected number and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { redeemScript: 'a' }],
      exception:
        'Data for input key redeemScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { witnessScript: 'a' }],
      exception:
        'Data for input key witnessScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              a: 1,
            },
          ],
        },
      ],
      exception:
        'Data for input key bip32Derivation is incorrect: Expected { ' +
        'masterFingerprint: Buffer; pubkey: Buffer; path: string; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptSig: 8 }],
      exception:
        'Data for input key finalScriptSig is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptWitness: 8 }],
      exception:
        'Data for input key finalScriptWitness is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { porCommitment: 8 }],
      exception:
        'Data for input key porCommitment is incorrect: Expected string and got',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { redeemScript: 8 }],
      exception:
        'Data for output key redeemScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { witnessScript: 8 }],
      exception:
        'Data for output key witnessScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              a: 8,
            },
          ],
        },
      ],
      exception:
        'Data for output key bip32Derivation is incorrect: Expected { ' +
        'masterFingerprint: Buffer; pubkey: Buffer; path: string; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [12, dummy4Byte()],
      exception: 'No input #12',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [12, dummy4Byte()],
      exception: 'No output #12',
    },
    {
      method: 'addInput',
      addInputOutput: true,
      args: [
        {
          hash:
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
          index: 1,
          unknownKeyVals: 34,
        },
      ],
      exception: 'unknownKeyVals must be an Array',
    },
    {
      method: 'addOutput',
      addInputOutput: true,
      args: [
        {
          script: Buffer.from(
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
            'hex',
          ),
          value: satoshiToConfidentialValue(3),
          asset: Buffer.concat([
            Buffer.alloc(1, 1),
            Buffer.from(
              '1f91920948cdb31244b795cdfef87f5139adfcf8b743ce549d91ebc68ced19f8',
              'hex',
            ),
          ]),
          nonce: Buffer.from('00', 'hex'),
          unknownKeyVals: 34,
        },
      ],
      exception: 'unknownKeyVals must be an Array',
    },
    {
      method: 'addUnknownKeyValToGlobal',
      addInputOutput: true,
      args: [{ key: Buffer.from([0]), value: Buffer.from([255]) }],
      exception:
        'Use the method for your specific key instead of addUnknownKeyVal*',
    },
    {
      method: 'addUnknownKeyValToGlobal',
      addInputOutput: true,
      twice: true,
      args: [{ key: Buffer.from([255]), value: Buffer.from([255]) }],
      exception: 'Duplicate Key: ff',
    },
  ],
};
