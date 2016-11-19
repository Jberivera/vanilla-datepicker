export function createDomElement (type, props, child) {
  var element = document.createElement(type);

  Object.keys(props).forEach(function (key) {
    element.setAttribute(key, props[key]);
  });

  switch (typeof child) {
    case 'number':
    case 'string':
      element.innerHTML = child;
      break;
    case 'object':
      appendArray(element, child);
      break;
  }

  return element;
}

export function appendArray (wrapper, nodes) {
  if (typeof nodes[0] === 'string') {
    wrapper.innerHTML = nodes.join('');
  } else {
    nodes.forEach(function (node) {
      wrapper.appendChild(node);
    });
  }
}
