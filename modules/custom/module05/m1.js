console.log('m1은 Object를 exports 하는 모듈.');

// module.exports = {
//   name: 'm1',
//   type: 'object'
// };

// module.exports 초기값은 {}
// module.exports.name = 'm1';
// module.exports.type = 'object';

// exports = module.exports = {};
// exports.name = 'm1';
// exports.type = 'object';

exports = {
  name: 'm1',
  type: 'object'
};