'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const b = hex => Buffer.from(hex, 'hex');
exports.fixtures = [
  {
    description: 'Should create a psbt',
    input: {
      addInputs: [
        {
          hash:
            '14eba443d704e20f9e3c1d659a027993f8f18eb24a4502897b89e4132d7434e4',
          index: 1,
        },
      ],
      addOutputs: [
        {
          script: b('76a91439397080b51ef22c59bd7469afacffbeec0da12e88ac'),
          value: b('010000000007270e00'),
          asset: b(
            '0125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a',
          ),
          nonce: b('00'),
        },
        {
          script: b('76a91450a410115f0a7d8a99472e47d1928ff8086948c888ac'),
          value: b('010000000004c4b1a8'),
          asset: b(
            '0125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a',
          ),
          nonce: b('00'),
        },
        {
          script: b(''),
          value: b('010000000000000258'),
          asset: b(
            '0125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a',
          ),
          nonce: b('00'),
        },
      ],
      updateInputData: [
        {
          witnessUtxo: {
            script: b('a914577a9c9f969d90745190a55b1814612490d0115b87'),
            value: b('01000000000bebc200'),
            nonce: b('00'),
            asset: b(
              '0125b251070e29ca19043cf33ccd7324e2ddab03ecc4ae0b5e77c4fc0e5cf6c95a',
            ),
          },
          sighashType: 1,
        },
      ],
      updateOutputData: [
        {
          redeemScript: b('76a91439397080b51ef22c59bd7469afacffbeec0da12e88ac'),
        },
        {
          redeemScript: b('76a914659bedb5d3d3c7ab12d7f85323c3a1b6c060efbe88ac'),
        },
      ],
    },
    expectedBeforeUpdate:
      'cHNidP8BAOoCAAAAAAHkNHQtE+SJe4kCRUqyjvH4k3kCmmUdPJ4P4gTXQ6TrFAEA' +
      'AAAA/////wMBJbJRBw4pyhkEPPM8zXMk4t2rA+zErgted8T8Dlz2yVoBAAAAAAcn' +
      'DgAAGXapFDk5cIC1HvIsWb10aa+s/77sDaEuiKwBJbJRBw4pyhkEPPM8zXMk4t2r' +
      'A+zErgted8T8Dlz2yVoBAAAAAATEsagAGXapFFCkEBFfCn2KmUcuR9GSj/gIaUjI' +
      'iKwBJbJRBw4pyhkEPPM8zXMk4t2rA+zErgted8T8Dlz2yVoBAAAAAAAAAlgAAAAA' +
      'AAAAAAAAAA==',
    expectedAfterUpdate:
      'cHNidP8BAOoCAAAAAAHkNHQtE+SJe4kCRUqyjvH4k3kCmmUdPJ4P4gTXQ6TrFAEA' +
      'AAAA/////wMBJbJRBw4pyhkEPPM8zXMk4t2rA+zErgted8T8Dlz2yVoBAAAAAAcn' +
      'DgAAGXapFDk5cIC1HvIsWb10aa+s/77sDaEuiKwBJbJRBw4pyhkEPPM8zXMk4t2r' +
      'A+zErgted8T8Dlz2yVoBAAAAAATEsagAGXapFFCkEBFfCn2KmUcuR9GSj/gIaUjI' +
      'iKwBJbJRBw4pyhkEPPM8zXMk4t2rA+zErgted8T8Dlz2yVoBAAAAAAAAAlgAAAAA' +
      'AAAAAQFDASWyUQcOKcoZBDzzPM1zJOLdqwPsxK4LXnfE/A5c9slaAQAAAAAL68IA' +
      'ABepFFd6nJ+WnZB0UZClWxgUYSSQ0BFbhwEDBAEAAAAAAQAZdqkUOTlwgLUe8ixZ' +
      'vXRpr6z/vuwNoS6IrAABABl2qRRlm+2109PHqxLX+FMjw6G2wGDvvoisAAA=',
  },
];
