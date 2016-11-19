function createDomElement (type, props, child) {
  var element = document.createElement(type);

  Object.keys(props).forEach(function (key) {
    element.setAttribute(key, props[key]);
  });

  switch (typeof child) {
    case 'string':
      element.innerHTML = child;
      break;
    case 'object':
      appendArray(element, child);
      break;
  }

  return element;
}

function appendArray (wrapper, nodes) {
  if (typeof nodes[0] === 'string') {
    wrapper.innerHTML = nodes.reduce(function (a, b) {
      return a + b;
    });
  }
  else {
    nodes.forEach(function (node) {
      wrapper.appendChild(node);
    });
  }
}

module.exports = {
  createDomElement: createDomElement,
  appendArray: appendArray
};
