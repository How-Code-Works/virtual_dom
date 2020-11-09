/*
 * Helper to create DOM abstraction
 */
const makeComponent = (tag) => (attributes, children) => {
  if (!attributes || !attributes.id) {
    throw new Error("Component needs an id");
  }

  return {
    tag,
    attributes,
    children,
  };
};

const div = makeComponent("div");
const p = makeComponent("p");
const h1 = makeComponent("h1");

/*
 * app component - creates a slightly more complex component out of our base elements
 */
const app = (state) =>
  div({ id: "main" }, [
    div({ id: "header" }, [h1({ id: "title" }, `Hello, ${state.subject}!`)]),
    div({ id: "content" }, [
      p({ id: "static1" }, "This is a static component"),
      p({ id: "static2" }, "It should never have to be re-created"),
    ]),
  ]);

/*
 * Sets element attributes
 * element: a DOM element
 * attributes: object in the format { attributeName: attributeValue }
 */
const setAttributes = (element, attributes) => {
  return Object.keys(attributes).forEach((a) =>
    element.setAttribute(a, attributes[a])
  );
};

/*
 * Renders a virtual DOM node (and its children)
 */
const renderNode = ({ tag, children = "", attributes = {} }) => {
  // Let's start by creating the actual DOM element and setting attributes
  const el = document.createElement(tag);
  setAttributes(el, attributes);

  if (typeof children === "string") {
    // If our "children" property is a string, just set the innerHTML in our element
    el.innerHTML = children;
  } else {
    // If it's not a string, then we're dealing with an array. Render each child and then run the `appendChild` command from this element
    children.map(renderNode).forEach(el.appendChild.bind(el));
  }

  // We finally have the node and its children - return it
  return el;
};
/*
 * Runs a shallow comparison between 2 objects
 */
const areObjectsDifferent = (a, b) => {
    // Set of all unique keys (quick and dirty way of doing it)
    const allKeys = Array.from(new Set([...Object.keys(a), ...Object.keys(b)]));
  
    // Return true if one or more elements are different
    return allKeys.some(k => a[k] !== b[k]);
  };
  
  /*
   * Diff 2 nodes
   * Returns true if different, false if equal
   */
  const areNodesDifferent = (a, b) => {
    // If at least one of the nodes doesn't exist, we'll consider them different.
    // Also, if the actual `tag` changed, we don't need to check anything else.
    if (!a || !b || (a.tag !== b.tag)) return true;
  
    const typeA = typeof a.children;
    const typeB = typeof b.children;
  
    return typeA !== typeB // Cover the case where we went from children being a string to an array
      || areObjectsDifferent(a.attributes, b.attributes) // changes in attributes
      || (typeA === 'string' && a.children !== b.children); // if it's a string, did the text change?
  };
/*
 * Gets the previous and current node representations
 * replaces the real DOM based on whether or not the representation changed
 */
const diffAndReRender = (previousNode, currentNode) => {
  if (areNodesDifferent(currentNode, previousNode)) {
    // Is the current node different? If so, replace it.
    const nodeId = currentNode.attributes.id;
    previousNode.children = currentNode
    return document
      .querySelector(`#${nodeId}`)
      .replaceWith(renderNode(currentNode));
  } else if (currentNode.children instanceof Array) {
    // If not, and the children prop is an array, recursivelly call this function for each child
    currentNode.children.forEach((currChildNode, index) => {
      diffAndReRender(previousNode.children[index], currChildNode);
    });
  }
};
let subject = true
// Render the initial application
const virtualDOMTree = app({ subject });
const root = document.querySelector("#root");
root.appendChild(renderNode(virtualDOMTree));

// Generate a new virtual DOM tree based on a change in state:

setInterval(() => {
    subject = !subject;
    const newVirtualDOMTree = app({ subject });
    diffAndReRender(virtualDOMTree, newVirtualDOMTree);
    
}, 1000)
