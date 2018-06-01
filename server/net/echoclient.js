var s = new require('net').Socket();
process.stdin.pipe(s).pipe(process.stdout);
s.connect(3456, 'localhost');