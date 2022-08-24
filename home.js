
// initial
var fName = "Guess";
var questionList;
var currentQuestion = 0;
var score = 0;
var correct_Answer = "";

//Load questions to array
fetch("questions/Q1.json")
  .then((response) => response.json())
  .then((json) => {
    questionList = json.questions;
    console.log(questionList.length);
 })
  .catch((err) => console.log(err));

//Get api quote from server
fetch("https://quotes.rest/qod")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    let quotes = json.contents.quotes[0];
    console.log(quotes);
    $("#dailyQuote").text(quotes.quote);
    $("#author").html("<spin>&#8212;&#8212;</spin>"+quotes.author);

  })
  .catch((err) => console.log(err));


//submit signin first and last name, display on page
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

    correct_Answer = questions.correctAnswer; // save correct answers
    console.log(correct_Answer);
    $("#questions").text(questions.question);
    $("#answers").html("");
    // change to array of object and make it better readable
    Object.entries(questions.answers).forEach((element) => {
        
      let listQuestion =
        `<input type='radio' id='${element[0]}' name='answer' value='${element[0]}' required><label for='${element[0]}'>${element[0]}: ${element[1]}</label><br>`;
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
  let finalResult = ((score / questionList.length) * 100).toFixed(2);
  if (finalResult > 50) {
    $("#finalScore").text(
      "Congratulation, you got " + finalResult + "% correct, you pass the quiz."
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
      let questions = questionList[currentQuestion];

      if (currentQuestion >= 0) {
        document.getElementById("welcome").style.display = "none";
        $("#nextQuestion").text("Next Question");

        if (currentQuestion > 0) {
          console.log("my answer: "+
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
      if (currentQuestion >= questionList.length) {
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
