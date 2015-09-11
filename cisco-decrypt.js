/*

  The MIT License (MIT)

  Copyright (c) 2015 Stanislav Artemkin

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.

*/

function base16decode(str) {
  return str.replace(/([A-F0-9]{2})/g, function(m, g1) {
      return String.fromCharCode(parseInt(g1, 16));
  });
}

function get_temp_hash(origHash, offset) {
  return origHash.substring(0, 19) +
    String.fromCharCode(origHash.charCodeAt(19) + offset);
}

function calc_3des_key(origHash) {
  var md = forge.md.sha1.create();
  md.update(get_temp_hash(origHash, 1));
  var hashV1 = md.digest().getBytes();

  md = forge.md.sha1.create();
  md.update(get_temp_hash(origHash, 3));
  var hashV2 = md.digest().getBytes();

  return hashV1 + hashV2.substring(0, 4);
}

function decryptPassword(pwd) {
  var binPwd = base16decode(pwd);
  var desKey = calc_3des_key(binPwd);
  var iv = binPwd.substring(0, 8);
  var encrypted = binPwd.substring(40);
  var encryptedBuffer = forge.util.createBuffer(encrypted, 'raw');

  var decipher = forge.cipher.createDecipher('3DES-CBC', desKey);
  decipher.start({iv: iv});
  decipher.update(encryptedBuffer);
  decipher.finish();
  var decrypted = decipher.output.getBytes();

  return decrypted;
}

