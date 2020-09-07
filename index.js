/*
 * Name: Aaron Tsang
 * Date: April 21, 2020
 * Section: CSE 154 AL
 *
 * This is the JS to implement the interactions for my InfoCard webpage, from screen to screen.
 */

'use strict';

(function() {
  window.addEventListener('load', init);
  window.addEventListener('load', type);

  /** Initializes all the button click event listener after the DOM is fully loaded */
  function init() {
    id('enter').addEventListener('click', enterForm);
    qs('#name img').addEventListener('click', toq2);
    qs('#school img').addEventListener('click', toq3);
    qs('#classes img').addEventListener('click', toResume);
    qs('#classes button').addEventListener('click', addClass);
    type();
    delayShow();
  }

  /** Individually types out each letter of the chosen text with the chosen delay speed */
  function type() {
    const SPEED = 100;
    let i = 0;
    let txt = qs('div p').textContent;
    qs('div p').textContent = '';
    let timerID = setInterval(function() {
      if (i < txt.length) {
        qs('div p').textContent += txt[i];
        i++;
      } else {
        clearInterval(timerID);
      }
    }, SPEED);
  }

  /** On button click, it changes the screen from the welcome screen to article with ID="name" */
  function enterForm() {
    qs('div').classList.add('hidden');
    id('name').classList.remove('hidden');
  }

  /** On button click, it changes the screen from ID="name" to ID="school" */
  function toq2() {
    id('name').classList.add('hidden');
    id('school').classList.remove('hidden');
  }

  /** On button click, it changes the screen from ID="school" to ID="classes" */
  function toq3() {
    id('school').classList.add('hidden');
    qs('#classes h1').textContent += (id('uni').value + '?');
    id('classes').classList.remove('hidden');
  }

  /**
   * On button click, it changes the screen from ID="classes" to ID="resume". It will then build
   * the HTML elements with the relevant information given by the user.
   */
  function toResume() {
    id('resume').classList.add('resume');
    id('classes').classList.add('hidden');
    id('resume').classList.remove('hidden');

    let fullname = gen('h1');
    fullname.textContent = 'Name: ' + id('full-name').value;
    id('resume').appendChild(fullname);

    let school = gen('h2');
    school.textContent = 'School: ' + id('uni').value;
    id('resume').appendChild(school);

    let para = gen('p');
    para.textContent = 'Classes ' + id('full-name').value + ' is taking:';
    id('resume').appendChild(para);

    let numClasses = gen('ul');
    numClasses = id('classlist');
    id('resume').appendChild(numClasses);
  }

  /** Adds a 'class' (input from user) into the unordered list inside ID="classes" */
  function addClass() {
    let item = gen('li');
    item.textContent = qs('#classes input').value;
    id('classlist').append(item);
    qs('#classes input').value = '';
  }

  /** Delays the appearance of the 'enter' button on the main screen */
  function delayShow() {
    const SPEED = 4000;
    setTimeout(showButton, SPEED);
  }

  /** Sets the visibility of the button with ID='enter' to visible */
  function showButton() {
    id('enter').style.visibility = 'visible';
  }

  /**
   * shortens the amount of typing to obtain an element by its ID
   * @param {String} idName - name of the ID being selected
   * @returns {Object} - the Object being represented by the ID name
   */
  function id(idName) {
    return document.getElementById(idName);
  }

  /**
   * shortens the amount of typing to obtain a querySelector
   * @param {String} selector - the script tag being selected
   * @returns {Object} - the Object being represented by the querySelector script tag
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * shortens the amount of typing to create an element
   * @param {String} elType - the type of element (HTML tag) being created
   * @returns {Object} - the Object being created as specified by the parameter
   */
  function gen(elType) {
    return document.createElement(elType);
  }

})();