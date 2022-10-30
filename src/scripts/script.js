"use strict";

/* ***************** *\
 * Variables Declaration 
\* ***************** */
const inputField = document.querySelector(".js-input-field");
const todoList = document.querySelector(".js-todo-list");
const completeList = document.querySelector(".js-complete-list");
const listContainer = document.querySelector(".list-container");

let list = document.querySelectorAll(".js-list");

/* ********************** *\
 * Variables Declaration end
\* ******************** */

/* ********************** *\
 * Function Declaration
\* ******************** */

/**
 * If the checkbox is checked, move the parent element of the checkbox to the complete list, otherwise
 * move it to the todo list
 * @returns the event.target.checked
 */

function moveList() {
  return event.target.checked
    ? completeList.appendChild(event.target.parentElement)
    : todoList.appendChild(event.target.parentElement);
}

/**
 * When the delete button is clicked, the parent element of the button is removed
 */
function deleteItem() {
  event.target.parentElement.remove();
  console.log("delete it");
}

/**
 * The function moves the list element down one position in the list
 */
function moveDown() {
  let theListElement = event.target.parentElement.parentElement;
  let theListElementSibling =
    event.target.parentElement.parentElement.nextElementSibling;
  if (theListElement.parentElement.classList[2] == "js-todo-list") {
    todoList.insertBefore(theListElementSibling, theListElement);

    theListElement.classList.add("anima-up-to-start");
    theListElementSibling.classList.add("anima-down-to-start");
    theListElementSibling.style.opacity = "40%";
    setTimeout(() => {
      theListElement.classList.remove("anima-up-to-start");
      theListElementSibling.classList.remove("anima-down-to-start");
      theListElementSibling.removeAttribute("style");
    }, 225);
  } else {
    completeList.insertBefore(theListElementSibling, theListElement);
    theListElement.classList.add("anima-up-to-start");
    theListElementSibling.classList.add("anima-down-to-start");
    theListElementSibling.style.opacity = "40%";
    setTimeout(() => {
      theListElement.classList.remove("anima-up-to-start");
      theListElementSibling.classList.remove("anima-down-to-start");
      theListElementSibling.removeAttribute("style");
    }, 225);
  }
}

/**
 * If the list element is in the todo list, then move it up one position in the todo list. If the list
 * element is in the complete list, then move it up one position in the complete list
 */
function MoveUp() {
  let theListElement = event.target.parentElement.parentElement;
  let theListElementSibling =
    event.target.parentElement.parentElement.previousElementSibling;

  if (theListElement.parentElement.classList[2] == "js-todo-list") {
    if (theListElementSibling !== null) {
      todoList.insertBefore(theListElement, theListElementSibling);

      theListElement.classList.add("anima-down-to-start");
      theListElementSibling.classList.add("anima-up-to-start");
      theListElementSibling.style.opacity = "40%";
      setTimeout(() => {
        theListElement.classList.remove("anima-down-to-start");
        theListElementSibling.classList.remove("anima-up-to-start");
        theListElementSibling.removeAttribute("style");
      }, 300);
    }
  } else {
    if (theListElementSibling !== null) {
      completeList.insertBefore(theListElement, theListElementSibling);
      theListElement.classList.add("anima-down-to-start");
      theListElementSibling.classList.add("anima-up-to-start");
      theListElementSibling.style.opacity = "40%";
      setTimeout(() => {
        theListElement.classList.remove("anima-down-to-start");
        theListElementSibling.classList.remove("anima-up-to-start");
        theListElementSibling.removeAttribute("style");
      }, 300);
    }
  }
}

/**
 * If the parent of the parent of the target of the event does not contain the class "full-height", add
 * the class "full-height" to the parent of the parent of the target of the event and add the class
 * "title-triangle-active" to the next sibling of the target of the event. Otherwise, remove the class
 * "full-height" from the parent of the parent of the target of the event and remove the class
 * "title-triangle-active" from the next sibling of the target of the event
 */
function fullHeight() {
  if (
    event.target.parentElement.parentElement.classList.contains(
      "full-height"
    ) !== true
  ) {
    event.target.parentElement.parentElement.classList.add("full-height");
    event.target.nextElementSibling.classList.add("title-triangle-active");
  } else {
    event.target.parentElement.parentElement.classList.remove("full-height");
    event.target.nextElementSibling.classList.remove("title-triangle-active");
  }
}

/* This function is creating a new element. The function takes in 7 parameters. The first parameter is
the name of the element. The second parameter is the class of the element. The third parameter is
the type of the element. The fourth parameter is the source of the element. The fifth parameter is
the alt text of the element. The sixth parameter is the data of the element. The seventh parameter
is the content editable of the element. */
function createNewElement(
  nameTag,
  classes = null,
  type = null,
  source = null,
  altText = null,
  data = null,
  contentEditable = null
) {
  const newElement = document.createElement(nameTag);
  newElement.setAttribute("class", classes);

  // if the element is a checkbox
  if (nameTag === "input") {
    newElement.setAttribute("type", type);
  }

  // if the element is a img
  if (nameTag === "img") {
    newElement.setAttribute("src", source);
    newElement.setAttribute("alt", altText);
    if (data !== null) {
      newElement.setAttribute("data-state", data);
    }
  }

  if (nameTag == "span") {
    newElement.setAttribute("contenteditable", contentEditable);
    newElement.append(inputField.value);
  }

  return newElement;
}

/**
 * It creates a new list item, adds the necessary elements to it, and appends it to the todo list
 */
function newItem() {
  const liElement = document.createElement("li");
  liElement.setAttribute("class", "list js-list");

  const arrowContainer = createNewElement("div", "arrows-container");
  arrowContainer.appendChild(
    createNewElement(
      "img",
      "arrows arrow--up js-arrow--up",
      null,
      "./assets/svg/arrow-up.svg",
      "arrow up",
      "up"
    )
  );
  arrowContainer.appendChild(
    createNewElement(
      "img",
      "arrows arrow--down js-arrow--down",
      null,
      "./assets/svg/arrow-up.svg",
      "arrow down",
      "down"
    )
  );

  const checkboxElement = createNewElement(
    "input",
    "checkbox js-checkbox",
    "checkbox"
  );

  const spanElement = createNewElement(
    "span",
    null,
    null,
    null,
    null,
    null,
    false
  );

  const deleteBtn = createNewElement(
    "img",
    "delete js-delete",
    null,
    "./assets/svg/cancel.svg",
    "delete button"
  );

  liElement.appendChild(arrowContainer);
  liElement.appendChild(checkboxElement);
  liElement.appendChild(spanElement);
  liElement.appendChild(deleteBtn);
  todoList.appendChild(liElement);
}

/**
 * If the input field is not empty, add a new item to the list and clear the input field. If the input
 * field is empty, shake the input field
 */

function addToList() {
  if (inputField.value !== "") {
    newItem();
    inputField.value = "";
  } else {
    inputField.className += " anima-shake";
    setTimeout(() => {
      inputField.classList.remove("anima-shake");
    }, 200);
  }
}

/* *********************** *\
 * Function Declaration end
\* *********************** */

/* *********************** *\
 * Event Listener  
\* *********************** */

/* This is an event listener. It is listening for a click event. When the click event is triggered, it
will run the function. The function will check the class of the element that was clicked. If the
class is js-checkbox, then it will run the moveList function. If the class is js-delete, then it
will run the deleteItem function. If the data-state is down, then it will run the moveDown function.
If the data-state is up, then it will run the MoveUp function. */

listContainer.addEventListener("click", (event) => {
  const elementTarget = event.target;
  console.log(elementTarget);
  if (elementTarget.classList[1] === "js-checkbox") {
    moveList();
  } else if (elementTarget.classList[1] === "js-delete") {
    deleteItem();
  } else if (elementTarget.dataset.state === "down") {
    moveDown();
  } else if (elementTarget.dataset.state === "up") {
    MoveUp();
  } else if (elementTarget.classList[1] === "js-input-field-btn") {
    addToList();
  } else if (elementTarget.classList.contains("js-complete-list-p") === true) {
    fullHeight();
  }
});

/* This is an event listener. It is listening for a keydown event. When the keydown event is triggered,
it will run the function. The function will check the keycode of the key that was pressed. If the
keycode is 13, then it will run the newItem function and set the value of the input field to an
empty string. */

inputField.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    addToList();
  }
});

/* *********************** *\
 * Event Listener End  
\* *********************** */
