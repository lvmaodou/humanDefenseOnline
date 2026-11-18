const decode = require('implode-decoder');
process.stdin.pipe(decode()).on('error', error => { console.error(error); process.exitCode = 1; }).pipe(process.stdout);
