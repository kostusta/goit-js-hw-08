import throttle from "lodash.throttle"

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  submitButton: document.querySelector('.feedback-form button[type="submit"]'),
};

function onFeedbackFormInput(event) {
  const [input, textarea] = event.currentTarget.elements;
  const feedbackFormState = {
    email: input.value,
    message: textarea.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(feedbackFormState));
}

function onFeedbackFormSubmit(event) {
  event.preventDefault();

  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  localStorage.removeItem('feedback-form-state');
  event.currentTarget.reset();
}

refs.feedbackForm.addEventListener('input', throttle(onFeedbackFormInput, 500));
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
