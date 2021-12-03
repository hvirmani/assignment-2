let add_subject = document.getElementById("subject");
let add_question = document.getElementById("question");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let list = document.getElementById("list");
let search_question = document.getElementById("new_question");
let discussion = document.getElementById("discussion");
let response = document.getElementById("response");
let response_question = document.getElementById("response_question");
let response_description = document.getElementById("response_description");
let name = document.getElementById("name");
let comment = document.getElementById("comment");
let response_submit = document.getElementById("submitResponse");
let response_list = document.getElementById("response_list");
let resolve = document.getElementById("resolve");
let a = 0;
let current;
let current_item;
let data = localStorage.getItem("questions");
if (data) {
  data = JSON.parse(data);
  let key = 0;
  data.forEach((element) => {
    element.key = key++;
  });
}

let questions = data || [];

let createQuestion = (subject, description) => {
  let list_item = document.createElement("div");
  list_item.className = "question";
  let newSubject = document.createElement("h2");
  newSubject.className = "demo";
  let newQuestion = document.createElement("p");
  newSubject.innerHTML = subject;
  newQuestion.innerHTML = description;
  list_item.appendChild(newSubject);
  list_item.appendChild(newQuestion);
  list.appendChild(list_item);
  list_item.dataset.key = a++;
  list_item.addEventListener("click", () => {
    current = list_item.dataset.key;
    if (
      discussion.style.display == "none" &&
      response_question.innerHTML == subject
    ) {
      discussion.style.display = "flex";
      response.style.display = "none";
    } else {
      discussion.style.display = "none";
      response.style.display = "flex";
      response_question.innerHTML = "";
    }
    response_question.innerHTML = subject;
    response_description.innerHTML = description;
    response_list.innerHTML = "";
    showResponse();
  });
};

let showResponse = () => {
  questions.forEach((question) => {
    if (question.key == current) {
      question.comments.forEach((comment) => {
        let div = document.createElement("div");
        let new_response = document.createElement("h3");
        let new_comment = document.createElement("p");
        new_response.innerHTML = comment.name;
        new_comment.innerHTML = comment.comment;
        div.appendChild(new_response);
        div.appendChild(new_comment);
        response_list.appendChild(div);
      });
    }
  });
};

let addResponse = () => {
  questions.forEach((question) => {
    if (question.key == current) {
      question.comments.push({
        name: name.value,
        comment: comment.value,
      });
    }
  });
  localStorage.setItem("questions", JSON.stringify(questions));
  name.value = "";
  comment.value = "";
  response_list.innerHTML = "";
  showResponse();
};
let addQuestion = () => {
  let subject = add_subject.value;
  let question = add_question.value;
  questions.push({
    subject: subject,
    description: question,
    comments: [],
    key: a,
  });
  localStorage.setItem("questions", JSON.stringify(questions));
  createQuestion(subject, question);
  add_subject.value = "";
  add_question.value = "";
};

questions.forEach((question) => {
  createQuestion(question.subject, question.description);
});

resolve.addEventListener("click", () => {
  list.childNodes.forEach((list_item) => {
    //here check is because first child of list is text of null value and that does'nt have dataset value
    if (list_item.dataset) {
      if (list_item.dataset.key == current) {
        list.removeChild(list_item);
        questions.forEach((question, index) => {
          if (question.key == current) {
            questions.splice(index, 1);
            current = index;
          }
        });
        discussion.style.display = "flex";
        response.style.display = "none";
        response_question.innerHTML = "";
        response_list.innerHTML = "";
        localStorage.setItem("questions", JSON.stringify(questions));
      }
    }
  });
});

submit.addEventListener("click", addQuestion);
response_submit.addEventListener("click", addResponse);
let acd = document.getElementsByClassName("demo");
search.addEventListener("keyup", () => {
  for (let i = 0; i < acd.length; i++) {
    if (!acd[i].innerHTML.includes(search.value)) {
      acd[i].parentElement.style.display = "none";
    } else {
      acd[i].parentElement.style.display = "block";
    }
  }
});

search_question.addEventListener("click", () => {
  search.value = "";
  for (let i = 0; i < acd.length; i++) {
    acd[i].parentElement.style.display = "block";
  }
  discussion.style.display = "flex";
  response.style.display = "none";
  response_question.innerHTML = "";
  response_list.innerHTML = "";
});
