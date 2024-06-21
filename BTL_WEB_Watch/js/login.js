const forms = document.querySelector(".forms"),
pwShowHide = document.querySelectorAll(".eye-icon"),
links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
  let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
  
  pwFields.forEach(password => {
      if(password.type === "password"){
          password.type = "text";
          eyeIcon.classList.replace("bx-hide", "bx-show");
          return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
  })
  
})
})      

links.forEach(link => {
link.addEventListener("click", e => {
 e.preventDefault(); //preventing form submit
 forms.classList.toggle("show-signup");
})
})

function closeSignupPopup() {
  document.getElementById('signupPopup').style.display = 'none';
}

function confirmSignup() {
  // Logic for confirming signup goes here
  closeSignupPopup();

  if (window.location.pathname.includes('signup')) {
    window.location.href = 'login.html'; 
  } else if (window.location.pathname.includes('login')) {
    window.location.href = 'index.html';
  }
}

window.onload = function() {
  var registerButton = document.querySelector('.button-field button');
  var form = document.querySelector('form');
  
  var isSignupForm = form.id === 'signupForm'; 

  var passwordInput, confirmPasswordInput;

  if (isSignupForm) {
    passwordInput = form.querySelector('input[type="password"]');
    confirmPasswordInput = form.querySelectorAll('input[type="password"]')[1];
  }

  registerButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (isSignupForm) {
      if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Passwords do not match. Please try again.');
        return; 
      }
    }
    
    if (form.checkValidity()) {
      if (isSignupForm) {
        document.getElementById('signupPopup').style.display = 'flex';
      } else {
        document.getElementById('signupPopup').style.display = 'flex';
      }
    } else {
      alert('Please fill valid information in all required fields.');
      form.reportValidity();
    }
  });
}
