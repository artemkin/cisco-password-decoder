# Cisco VPN Client Password Decoder

Pure javascript decoder for password encoding of Cisco VPN client.

Usually, you need to decrypt group password stored in *.PCF files to setup [native Cisco VPN connection in Mac OS X][1]. 

In contrast to other implementations, this decoder does everything in a browser, so a password never leaves your computer.

[<h3>Decode group password with style ;)</h3>][2]

Or check [index_plain.html][3] for really simple example of decoder usage with almost no design.

As an example, this should return "HelloWorld" as the password:

A39CADD77ED72A9C75467D0F5A5C88BFCD75370DD63E3388D3F402AF50C4E5029071B0965C343B99B6D6636A8698562DDB2EE51020D87EA3

[1]: http://anders.com/guides/native-cisco-vpn-on-mac-os-x/
[2]: http://artemkin.github.io/cisco-password-decoder
[3]: http://artemkin.github.io/cisco-password-decoder/index_plain.html
