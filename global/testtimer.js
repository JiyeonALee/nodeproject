function print(msg){
  console.log(msg);
}

print('1. start.');
// setTimeout(print, 1000, '3. setTimeout.');
// setInterval(print, 1000*2, '4. setInterval.');
setImmediate(print, '5. setImmediate.');
setTimeout(print, 0, '4. setTimeout.');
process.nextTick(print, '3. nextTick.');
print('2. finish.');