'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fixtures = [
  {
    hex: '70736574fe',
    exception: 'Format Error: Magic Number must be followed by 0xff separator',
  },
  {
    hex: '70736574ff010801ff010801ff00',
    exception: 'Format Error: Keys must be unique for global keymap: key 08',
  },
  {
    hex: '70736574ff010002000100010801ff010801fe00',
    exception:
      'Format Error: Keys must be unique for each output: output index 0 key 08',
  },
];
