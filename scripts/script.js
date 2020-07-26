//  === GLOBAL APPLICATION VARIABLES ===

// Global namespace object ----- +
const app = {};

// Answers array to be populated with user options for each quiz question ----- +
app.answers = ["", "", "", "", ""];

// Results array contains all possible quiz result objects----- +
app.results = [
  {
    id: "a",
    name: "thoughtful",
    count: 0,
    result:
      "You're a thoughtful and creative person who is most comfortable in the realm of ideas.",
  },
  {
    id: "b",
    name: "sensual",
    count: 0,
    result:
      "You're a sensual person who enjoys life's pleasures. You make the most of your time, and you remind those around you to live in the moment.",
  },
  {
    id: "c",
    name: "compassionate",
    count: 0,
    result:
      "You're a considerate person who likes to cultivate growth and improvement in yourself and those around you. You are comfortable with big feelings and have a calming energy that puts those around you at ease.",
  },
  {
    id: "d",
    name: "heroic",
    count: 0,
    result:
      "You make the best of situations and exude a deep sense of determination that others admire. Your adventurous spirit and strong will are a force to be reckoned with.",
  },
  {
    id: "e",
    name: "rebelious",
    result:
      "You're a rebel and can't be given a label. You like to defy expecations and can't be easily stereotyped.",
  },
];

// === SCREEN READER ACCESIBLE EFFECT ===

//Hides and shows elements on the page while ensuring they remain in the document flow ----- +
app.elementVisbility = (hide, show) => {
  $(hide).addClass("hide");
  $(hide).removeClass("show");
  $(show).removeClass("hide");
  $(show).addClass("show");
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

// Displays next or previous page, depending on button type ----- +
app.checkNavButton = (buttonType, next, previous) => {
  if (buttonType === "next") {
    $(next).removeClass("hide");
    $(next).addClass("show");
  } else if (buttonType === "back") {
    $(previous).removeClass("hide");
    $(previous).addClass("show");
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
    // -- Scoped Variables --
    const $fieldset = $(this).parents("fieldset");
    const questionIndex = $fieldset.attr("data-questionIndex");
    const $value = $(this).attr("value");
    // -- Function Calls --
    app.saveUserSelection(questionIndex, $value);
    // Adds styling to user-selected option
    $fieldset.find("div").removeClass("selected");
    $(this).parents("div").addClass("selected");
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

// Loops through the answers array and counts results  ----- +
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

  let resultTitle = "";
  let finalResult = "";

  // Update final result with ansewer type most chosen by the user
  if (optionA > optionB && optionA > optionC && optionA > optionD) {
    finalResult = a.result;
    resultTitle = a.name;
  } else if (optionB > optionA && optionB > optionC && optionB > optionD) {
    finalResult = b.result;
    resultTitle = b.name;
  } else if (optionC > optionA && optionC > optionB && optionC > optionD) {
    finalResult = c.result;
    resultTitle = c.name;
  } else if (optionD > optionA && optionD > optionB && optionD > optionC) {
    finalResult = d.result;
    resultTitle = d.name;
  } else {
    finalResult = e.result;
    resultTitle = e.name;
  }
  app.displayResults(finalResult, resultTitle);
};

// Appends final quiz result to the page ----- +
app.displayResults = (finalResult, resultTitle) => {
  app.elementVisbility(".quizWrapper", ".resultsWrapper");
  app.elementVisbility(".quizContainer", ".resultsContainer");
  $(".result").text(resultTitle).append(`<p>${finalResult}</p>`);
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

// // === RESET QUIZ ===

// // Handles quiz reset button ----- +
app.handleReset = () => {
  $(".reset").click(function () {
    location.reload();
  });
};

// === INITALIZES APPLICATION ===
app.init = () => {
  app.handleRadioSelection();
  app.handleSubmit();
  app.handleNavigation();
  app.handleReset();
};

// === DOCUMENT READY ===
$(function () {
  app.init();
});
