'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const b = hex => Buffer.from(hex, 'hex');
exports.fixtures = [
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('fb'),
        },
        {
          key: b('00'),
          value: b('fb'),
        },
      ],
      inputKeyVals: [],
      outputKeyVals: [],
    },
    exception: 'Format Error: GlobalMap has multiple UNSIGNED_TX',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('fb'),
        },
        {
          key: b('01'),
          value: b('fb'),
        },
      ],
      inputKeyVals: [],
      outputKeyVals: [],
    },
    exception:
      'Decode Error: globalXpub has invalid extended pubkey in key 0x01',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('fb'),
        },
        {
          key: b(
            '010488b21e034a346d9880000000032e6467810075260ee7a831189d814e656a' +
              '300ab7f9a151b7377efffe91051103b034ec32baa6c3c05481a9d15c6ee6c48a' +
              '9692e18285c174d414718f85670e22',
          ),
          value: b('fb'),
        },
      ],
      inputKeyVals: [],
      outputKeyVals: [],
    },
    exception:
      'Decode Error: Global GLOBAL_XPUB value length should be multiple of 4',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('fb'),
        },
      ],
      inputKeyVals: [
        [
          {
            key: b('01'),
            value: b(
              '0b1f91920948cdb31244b795cdfef87f5139adfcf8b743ce549d91ebc68ced16f8' +
                '08edef170b8f538c785be73e8a0a01b0707ac7e6088330a3180d37c278139f0973' +
                '00' +
                '0000000000000016' +
                '0014659bedb5d3d3c7ab12d7f85323c3a1b6c060efbe',
            ),
          },
          {
            key: b('00'),
            value: b('03'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple NON_WITNESS_UTXO',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('01'),
            value: b(
              '70aaf00800000000160014d85c2b71d0060b09c9886aeb815e50991dda124d',
            ),
          },
          {
            key: b('01'),
            value: b(
              '70aaf00800000000160014d85c2b71d0060b09c9886aeb815e50991dda124d',
            ),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple WITNESS_UTXO',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('02ffff'),
            value: b('00'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: invalid pubkey in key 0x02',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('03'),
            value: b('01020304'),
          },
          {
            key: b('03'),
            value: b('01020305'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple SIGHASH_TYPE',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('04'),
            value: b('01020304'),
          },
          {
            key: b('04'),
            value: b('01020305'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple REDEEM_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('09'),
            value: b('70736574'),
          },
          {
            key: b('05'),
            value: b('01020304'),
          },
          {
            key: b('05'),
            value: b('01020305'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple WITNESS_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [],
      outputKeyVals: [
        [
          {
            key: b('00'),
            value: b('01020304'),
          },
          {
            key: b('00'),
            value: b('01020305'),
          },
        ],
      ],
    },
    exception: 'Format Error: Output has multiple REDEEM_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [],
      outputKeyVals: [
        [
          {
            key: b('ef'),
            value: b('01020304'),
          },
          {
            key: b('01'),
            value: b('01020304'),
          },
          {
            key: b('01'),
            value: b('01020305'),
          },
        ],
      ],
    },
    exception: 'Format Error: Output has multiple WITNESS_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('0200000000000000000000'),
        },
        {
          key: b(
            '010488b21e034a346d9880000000032e6467810075260ee7a831189d814e656a' +
              '300ab7f9a151b7377efffe91051103b034ec32baa6c3c05481a9d15c6ee6c48a' +
              '9692e18285c174d414718f85670e22',
          ),
          value: b('01020304040000800500008006000000'),
        },
      ],
      inputKeyVals: [
        [
          {
            key: Buffer.from('ffaa', 'hex'),
            value: Buffer.from('unknowvalue', 'hex'),
          },
        ],
      ],
      outputKeyVals: [
        [
          {
            key: Buffer.from(
              '02041045d0af4528ccf6627650574f71ed46a642ee00f131' +
                'e4b223c0036915810060d19682b0d1f89f73bfe8756335' +
                '9880b67c49e408df089627a93abe9512cc6dd2',
              'hex',
            ),
            value: Buffer.from('01000000', 'hex'),
          },
        ],
      ],
    },
    expected:
      'cHNldP8BAAsCAAAAAAAAAAAAAE8BBIiyHgNKNG2YgAAAAAMuZGeBAHUmDu' +
      'eoMRidgU5lajAKt/mhUbc3fv/+kQURA7A07DK6psPAVIGp0Vxu5sSKlpLh' +
      'goXBdNQUcY+FZw4iEAECAwQEAACABQAAgAYAAAAAAv+qAABCAgQQRdCvRS' +
      'jM9mJ2UFdPce1GpkLuAPEx5LIjwANpFYEAYNGWgrDR+J9zv+h1YzWYgLZ8' +
      'SeQI3wiWJ6k6vpUSzG3SBAEAAAAA',
  },
];
