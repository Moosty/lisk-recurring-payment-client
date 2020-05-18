import crypto from 'crypto';
import { getAddressFromPublicKey } from '@liskhq/lisk-cryptography';

const chipher = [
  'z', 'x', 'v', 'c', 'p', 'm', 'b', 'n', '3', '4', '6', '5', 'o', '9', '7', '8',
  'u', 'y', 'r', 't', 'k', 'q', 'e', 'w', '2', 'a', 'd', 's', 'j', 'h', 'f', 'g'
];

function polymod(values) {
  var GENERATOR = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
  var chk = 1;
  for (var p = 0; p < values.length; ++p) {
    var top = chk >> 25;
    chk = (chk & 0x1ffffff) << 5 ^ values[p];
    for (var i = 0; i < 5; ++i) {
      if ((top >> i) & 1) {
        chk ^= GENERATOR[i];
      }
    }
  }
  return chk;
}

function createChecksum(data) {
  var values = data.concat([0, 0, 0, 0, 0, 0]);
  var mod = polymod(values) ^ 1;
  var ret = [];
  for (var p = 0; p < 6; ++p) {
    ret.push((mod >> 5 * (5 - p)) & 31);
  }
  return ret;
}

function verifyChecksum(codeword) {
  return polymod(codeword) === 1;
}

function toAddress(addressBytes) {
  return "lsk" + addressBytes.map(byte => {
    return chipher[byte];
  }).join("");
}

function hex2bin(h) {
  return h.split('').reduce(function (acc, i) {
    return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
  }, '')
}

function bin2hex(b) {
  return b.match(/.{4}/g).reduce(function (acc, i) {
    return acc + parseInt(i, 2).toString(16);
  }, '')
}

function getFirst160Bits(h) {
  return hex2bin(h).slice(0, 160);
}

function to5Bit(h) {
  let output = [];
  for (let i = 0; i < h.length; i = i + 5) {
    output.push(parseInt(h.slice(i, i + 5), 2));
  }
  return output;
}

function digestMessage(message) {
  return crypto.createHash('sha256').update(message, 'hex').digest().toString('hex')
}

export const convert = (publicKey) => {
  if (publicKey.length === 64) {
    const Hx = digestMessage(publicKey);
    const addr = bin2hex(getFirst160Bits(Hx));
    const H_5bit = to5Bit(getFirst160Bits(Hx));
    const checksum = createChecksum(H_5bit);
    const HCS = H_5bit.concat(...checksum);
    return {
      public_key: '0x' + publicKey,
      binary_address: '0x' + addr,
      base32_address: toAddress(HCS),
      old_address: getAddressFromPublicKey(publicKey),
    };
  } else {
    return {
      public_key: '0x' + publicKey,
      binary_address: "",
      base32_address: "",
      old_address: getAddressFromPublicKey(publicKey),
    }
  }
}
