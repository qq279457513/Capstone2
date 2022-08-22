// initial
var fName = "Guess";
var questionsUrl = [
  "questions/Q1.json",
  "questions/Q2.json",
  "questions/Q3.json",
];
var currentQuestion = 0;
var score = 0;
var correct_Answer = "";

fetch("https://quotes.rest/qod")
  .then((response) => response.json())
  .then((json) => {
    let quotes = json.contents.quotes[0];
    console.log(quotes);
    $("#dailyQuote").text(quotes.quote);
    $("#author").html("<spin>&#8212;&#8212;</spin>"+quotes.author);

  })
  .catch((err) => console.log(err));



$(document).ready(function () {
  $("#submitName").click(function (event) {
    event.preventDefault();
    console.log(document.getElementById("fname").value);
    fName = document.getElementById("fname").value;
    $("#tester").text(fName);
    $("#tester2").text(fName);
    console.log(document.getElementById("tester"));
  });
});
console.log(fName);

async function getQuestion(questions) {
  try {
    const response = await fetch(questions);
    const body = await response.json();

    console.log(body);
    correct_Answer = body.correctAnswer;
    $("#questions").text(body.question);
    $("#answers").html("");
    Object.entries(body.answers).forEach((element) => {
      let listQuestion =
        "<input type='radio' id='" +
        element[0] +
        "' name='answer' value='" +
        element[0] +
        "' required><label for='" +
        element[0] +
        "'>" +
        element[0] +
        ": " +
        element[1] +
        "</label><br>";
      $("#answers").append(listQuestion);
    });
  } catch (err) {
    console.log(err);
  }
}
// get result html display
function getResult() {
  document.getElementById("resultPanel").style.display = "block";
  document.getElementById("quizPanel").style.display = "none";
  let finalResult = ((score / questionsUrl.length) * 100).toFixed(2);
  if (finalResult > 50) {
    $("#finalScore").text(
      "Congraduation, you got " + finalResult + "% correct, you pass the quiz."
    );
  } else {
    $("#finalScore").text(
      "You got " + finalResult + "% correct, you fail the quiz."
    );
  }
}

$(document).ready(function () {
  $("#nextQuestion").click(function () {
    //check answer
    try {
      questions = questionsUrl[currentQuestion];

      if (currentQuestion >= 0) {
        document.getElementById("welcome").style.display = "none";
        console.log(document.getElement);
        if (currentQuestion > 0) {
          console.log(
            document.querySelector('input[name="answer"]:checked').value
          );
          if (
            document.querySelector('input[name="answer"]:checked').value ==
            correct_Answer
          ) {
            score++;
          }
          console.log(score);
        }
      }
      if (currentQuestion >= questionsUrl.length) {
        getResult();
      } else {
        getQuestion(questions);
      }
      currentQuestion++;
    } catch (err) {
      console.log(err);
      alert("Please select an answer.");
    }
  });
});
