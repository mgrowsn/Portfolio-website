const menuItems=document.querySelectorAll(".menu div");
menuItems.forEach(item=>{
  item.addEventListener("click",()=>{
    // add item to active state
    menuItems.forEach(i=>i.classList.remove("active"));
    item.classList.add("active");
    // scroll to section
    const target=document.querySelector(item.dataset.target);
    if(target){
      target.scrollIntoView({behavior:"smooth"});
    }
  });
});

const sections=document.querySelectorAll(".hero-section,.self,.services,.contact-me");
const navItems=document.querySelectorAll(".menu div");

window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(section=>{
    const sectionTop=section.offsetTop;
    const sectionHeight=section.clientHeight;
    if(scrollY>=sectionTop-200){
      current=section.getAttribute("id");
    }
  });
  navItems.forEach(item=>{
    item.classList.remove("active");
    if(item.dataset.target===`#${current}`){
      item.classList.add("active");
    }
  });
});

const typingText=document.querySelector(".init.sec")
const text="Software Engineer with expertise in Java, Spring Boot, and web development using HTML, CSS, and JavaScript.";
let i=0;
function typeEffect(){
  if(i<text.length){
    typingText.textContent+=text.charAt(i);
    i++;
    typingText.style.animation="blink 0.7s infinite"
    setTimeout(typeEffect,100); //call the same function again after 100ms
  }
  else{
    typingText.style.borderRight="none";
    typingText.style.animation="none";
  }
}
window.addEventListener("DOMContentLoaded",typeEffect);

document.addEventListener("DOMContentLoaded",()=>{
  const form=document.querySelector("#contactForm");
  const nameInput=document.querySelector(".name-form");
  const emailInput=document.querySelector(".email-form");
  const phoneInput=document.querySelector(".phone-form");
  const messageInput=document.querySelector(".msg");


  form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const name=nameInput.value.trim();
    const email=emailInput.value.trim();
    const phone=phoneInput.value.trim();
    const message=messageInput.value.trim();

    [nameInput,emailInput,phoneInput,messageInput].forEach(input=>{
      input.style.border="1px solid #ccc";
    });
    let isValid=true;
    let errorMessage="";
    if(name===""){
      isValid=false;
      errorMessage+="Name cannot be empty.\n";
      nameInput.style.border="2px solid red";
    }
    const emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if(!email.match(emailPattern)){
      isValid=false;
      errorMessage+="Enter a valid email address.\n";
      emailInput.style.border="2px solid red";
    }
    const phonePattern=/^[0-9]{10}$/;
    if(!phone.match(phonePattern)){
      isValid=false;
      errorMessage+="Enter a valid 10-digit phone number.\n";
      phoneInput.style.border="2px solid red";
    }
    if (message.length < 10) {
      isValid = false;
      errorMessage += "Message should be at least 10 characters.\n";
      messageInput.style.border = "2px solid red";
    }
    if(!isValid){
      alert(errorMessage);
      return;
    }
    
    const formData={name,email,phone,message};
    fetch("https://script.google.com/macros/s/AKfycbxUXnjXiB7HoT0o-bxqbJEllryZV5tx8HKHhuyG2s_EmK9ik7TFlfWIKa-i0PUqMFkZ/exec", {   
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("contactForm").reset();
    })
    .catch(error => {
      alert("Failed to send message!");
      console.error(error);
    });

  });
});

const toggleBtn=document.getElementById("toggleBtn");
const body=document.body;
if(localStorage.getItem("theme")==="dark"){
  body.classList.add("dark-mode");
  toggleBtn.textContent="☀️";
  toggleBtn.style.color="#f48fb1";
} else{
  toggleBtn.textContent="🌙";
  toggleBtn.style.color = "#d81b60";
}

    
toggleBtn.addEventListener("click",()=>{
  body.classList.toggle("dark-mode");
  if(body.classList.contains("dark-mode")){
    toggleBtn.textContent="☀️";
    toggleBtn.style.color="#f48fb1";
    localStorage.setItem("theme","dark");
  }
  else{
    toggleBtn.textContent="🌙";
    toggleBtn.style.color="#d81b60";
    localStorage.setItem("theme","light");
  }
})