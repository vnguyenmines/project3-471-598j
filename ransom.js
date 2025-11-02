
console.log('hello')

function numHandler(num) {
  console.log('num handler called ' + num)
  document.getElementById('inputbox').value += '' + num;
}

function deleteHandler() {
  console.log('delete handler called')
  document.getElementById('inputbox').value = '';
}



