console.log('console.log');
console.info('console.info');
console.error('console.error');
console.warn('console.warn');

var clog = require('clog');
clog.configure({'log level': 3});

clog.log('clog.log');
clog.info('clog.info');
clog.error('clog.error');
clog.warn('clog.warn');
clog.debug('clog.debug');

var logger = require('tracer').colorConsole({
  format: '[{{timestamp}}] {{title}}: {{message}} ({{file}}:{{line}})',
  dateformat: 'HH:MM:ss'
});
logger.log('tracer.log');
logger.info('tracer.info');
logger.error('tracer.error');
logger.warn('tracer.warn');
logger.debug('tracer.debug');
logger.trace('tracer.trace');
