export default function() {
  var div1 = document.createElement('div');
  div1.setAttribute('id', 'counter');
  div1.innerHTML = 1;
  div1.onclick = function(e) {
    var number = parseInt(e.target.innerHTML, 10) + 1
    e.target.innerHTML = number
  };
  document.body.appendChild(div1)
}
