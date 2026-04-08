var count = 1
function addfunction() {
  var btn = document.createElement("BUTTON");
  btn.innerHTML = `Click me (${count})`;
  btn.setAttribute("id", "btn" + count++);
  btn.setAttribute("class", "btnclass")
  console.log(btn);
  document.body.appendChild(btn);
};

function delfunction(){
  var btn = document.getElementById("btn" + --count);
  console.log(btn);
  document.body.removeChild(btn);
};