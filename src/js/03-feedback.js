import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  emailFeedbackForm: document.querySelector('input[type="email"]'),
  messageFeedbackForm: document.querySelector('textarea[name="message"]'),
  submitButton: document.querySelector('.feedback-form button[type="submit"]'),
};

const STORAGE_KEY = 'feedback-form-state';

function onFeedbackFormInput(event) {
  const feedbackFormState = {
    email: refs.emailFeedbackForm.value,
    message: refs.messageFeedbackForm.value,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormState));
}

function onFeedbackFormSubmit(event) {
  event.preventDefault();

  if (localStorage.getItem(STORAGE_KEY)) {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    localStorage.removeItem(STORAGE_KEY);
    event.currentTarget.reset();
  }
}

function onPageLoadHandler() {
  const feedbackFormState = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (feedbackFormState) {
    const { email, message } = refs.feedbackForm.elements;
    email.value = feedbackFormState.email;
    message.value = feedbackFormState.message;
  }
}

refs.feedbackForm.addEventListener('input', throttle(onFeedbackFormInput, 500));
refs.feedbackForm.addEventListener('submit', onFeedbackFormSubmit);
window.addEventListener('load', onPageLoadHandler);
