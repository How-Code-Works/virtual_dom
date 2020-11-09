/*
 * First we will build a virtual DOM
 * then we will try to parse our virtual DOM to create a real DOM
 *
 * To Build A simple virtual DOM we need to follow these steps
 * create a function that create a structure for each of our DOM element in virtual DOM
 * then we will use that function to crate our basic tags like div, h1 & p
 * then with the help of our basic tags we try to make an complex component
 * create a function that set attributes for each tag in real DOM
 * create a function that render our component to the real DOM
 * create a function to check if we have any change in attribute between current element and new element in Virtual DOM 
 * create a function to check if we have any change in content inside tag between current element and new element in Virtual DOM 
 * create a function that compare the current virtual DOM and next virtual DOM
 * 
 */

/*
 * Helper to create DOM abstraction
 */

/*
 * app component - creates a slightly more complex component out of our base elements
 */

/*
 * Sets element attributes
 * element: a DOM element
 * attributes: object in the format { attributeName: attributeValue }
 */

/*
 * Renders a virtual DOM node (and its children)
 */

/*
 * Runs a shallow comparison between 2 objects
 */

/*
 * Diff 2 nodes
 * Returns true if different, false if equal
 */

/*
 * Gets the previous and current node representations
 * replaces the real DOM based on whether or not the representation changed
 */

// Render the initial application

// Generate a new virtual DOM tree based on a change in state:
