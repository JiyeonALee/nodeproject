function hello(name){
  return 'Hello ' + name;
}
console.log(hello('Node'));

module.exports.hello = hello;