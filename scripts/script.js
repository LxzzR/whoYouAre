//  === GLOBAL APPLICATION VARIABLES ===

// Global namespace object ----- +
const app = {};

// Answers array to be populated with user options for each quiz question ----- +
app.answers = ["", "", "", "", ""];

// Results array contains all possible quiz result objects----- +
app.results = [
  { id: "a", name: "thoughtful", count: 0, result: "You got Thoughtful" },
  { id: "b", name: "sensual", count: 0, result: "You got sensual!" },
  {
    id: "c",
    name: "compassionate",
    count: 0,
    result: "You got compassionate!",
  },
  { id: "d", name: "leader", count: 0, result: "You got heoric" },
  {
    id: "e",
    name: "mixedResults",
    result: "You're a combination and can't be given a label",
  },
];

// === SCREEN READER ACCESIBLE EFFECT ===

//Hides and shows elements on the page while ensuring they remain in the document flow ----- +
app.elementVisbility = (hide, show) => {
  $(hide).addClass("hide");
  $(show).removeClass("hide");
};

// === QUIZ NAVIGATION FUNCTIONALITY ===

// Allows user to navigate through quiz questions ----- +
app.navigateQuestions = function (button) {
  const $buttonType = button.attr("class");
  const $questionIndex = button.parents("fieldset").attr("data-questionIndex");
  const $nextQuestion = `fieldset[data-questionIndex="${
    Number($questionIndex) + 1
  }"]`;
  const $previousQuestion = `fieldset[data-questionIndex="${
    Number($questionIndex) - 1
  }"]`;

  // Hides current quiz question
  button.parents("fieldset").addClass("hide");

  app.checkNavButton($buttonType, $nextQuestion, $previousQuestion);
};

// If button is "next" displays next page, if button is "previous" displays previous page ----- +
app.checkNavButton = (buttonType, next, previous) => {
  if (buttonType === "next") {
    $(next).removeClass("hide");
  } else if (buttonType === "back") {
    $(previous).removeClass("hide");
  }
};

// Handles navigation button event listeners ----- +
app.handleNavigation = function () {
  $("button").click(function () {
    const $button = $(this);
    app.navigateQuestions($button);
  });
};

// === QUIZ ANSWER FUNCTIONALITY ===

// Handles radio selection events ----- +
app.handleRadioSelection = function () {
  $("input[type=radio").click(function () {
    const $questionIndex = $(this)
      .parents("fieldset")
      .attr("data-questionIndex");
    const $value = $(this).attr("value");
    app.saveUserSelection($questionIndex, $value);
  });
};

// Stores user selection for each question and saves it in the app.answers array ----- +
app.saveUserSelection = function (questionIndex, value) {
  app.answers[questionIndex] = value;
};

// Upadtes the count for each possible user selection and saves them in the results array ----- +
app.findResults = function () {
  app.loopAnswers(app.answers);
  console.log(app.results);
};

// Loops through the answers array ----- +
app.loopAnswers = (array) => {
  array.forEach(function (answer) {
    const userResult = answer;
    app.countResults(userResult);
  });
};

// Counts the number of times each user answer was selected and updates the count properties in the results array objects ----- +
app.countResults = (userResult) => {
  switch (userResult) {
    case "thoughtful":
      app.results[0].count++;
      break;
    case "sensual":
      app.results[1].count++;
      break;
    case "compassionate":
      app.results[2].count++;
      break;
    case "leader":
      app.results[3].count++;
      break;
  }
};

// === QUIZ RESULTS FUNCTIONALITY  ===

// Checks user answers ----- +
app.determineResult = () => {
  const a = app.results[0];
  const b = app.results[1];
  const c = app.results[2];
  const d = app.results[3];
  const e = app.results[4];
  app.findFinalResult(a, b, c, d, e);
};

// Checks the number of times each result type was chosen ----- +
app.findFinalResult = (a, b, c, d, e) => {
  // Access the count values in the results array objects
  const optionA = a.count;
  const optionB = b.count;
  const optionC = c.count;
  const optionD = d.count;

  let finalResult = "";

  // Update final result with ansewer type most chosen by the user
  if (optionA > optionB && optionA > optionC && optionA > optionD) {
    finalResult = a.result;
  } else if (optionB > optionA && optionB > optionC && optionB > optionD) {
    finalResult = b.result;
  } else if (optionC > optionA && optionC > optionB && optionC > optionD) {
    finalResult = c.result;
  } else if (optionD > optionA && optionD > optionB && optionD > optionC) {
    finalResult = d.result;
  } else {
    finalResult = e.result;
  }
  app.displayResults(finalResult);
};

// Appends quiz results to the page ----- +
app.displayResults = (finalResult) => {
  app.elementVisbility(".quizWrapper", ".resultsWrapper");
  app.elementVisbility(".quizContainer", ".resultsContainer");
  // Appends final Result to the dom
  $(".result").text(finalResult);
};

// Handles the submit button ----- +
app.handleSubmit = () => {
  $("form").submit((e) => {
    e.preventDefault();
    app.elementVisbility(".questionFive");
    app.findResults();
    app.determineResult();
  });
};

// === INITALIZES APPLICATION ===
app.init = () => {
  app.handleRadioSelection();
  app.handleSubmit();
  app.handleNavigation();
};

// === DOCUMENT READY ===
$(function () {
  app.init();
});
