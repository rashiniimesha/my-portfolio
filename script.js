// === Text Animation ===
let words = document.querySelectorAll(".word");
if (words.length > 0) {
    words.forEach((word) => {
        let letters = word.textContent.split("");
        word.textContent = "";
        letters.forEach((letter) => {
            let span = document.createElement("span");
            span.textContent = letter;
            span.className = "letter";
            word.append(span);
        });
    });

    let currentWordIndex = 0;
    let maxWordIndex = words.length - 1;
    words[currentWordIndex].style.opacity = "1";

    let changeText = () => {
        let currentWord = words[currentWordIndex];
        let nextWord =
            currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

        Array.from(currentWord.children).forEach((letter, i) => {
            setTimeout(() => {
                letter.className = "letter out";
            }, i * 80);
        });

        nextWord.style.opacity = "1";
        Array.from(nextWord.children).forEach((letter, i) => {
            letter.className = "letter behind";
            setTimeout(() => {
                letter.className = "letter in";
            }, 340 + i * 80);
        });

        currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
    };

    changeText();
    setInterval(changeText, 3000);
}


// === Circle Skill Animation ===
const circles = document.querySelectorAll(".circle");
circles.forEach((elem) => {
    const dots = parseInt(elem.getAttribute("data-dots"));
    const marked = parseInt(elem.getAttribute("data-percent"));
    const percent = Math.floor((dots * marked) / 100);
    const rotate = 360 / dots;

    let points = "";
    for (let i = 0; i < dots; i++) {
        points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
    }

    elem.innerHTML = points;

    const pointsMarked = elem.querySelectorAll(".points");
    for (let i = 0; i < percent; i++) {
        pointsMarked[i].classList.add("marked");
    }
});


// === MixItUp Portfolio ===
if (typeof mixitup !== "undefined") {
    mixitup(".portfolio-gallery");
}


// === Active Menu Highlight ===
const menuLi = document.querySelectorAll("header ul li a");
const sections = document.querySelectorAll("section");

function activeMenu() {
    let len = sections.length;
    while (--len && window.scrollY + 97 < sections[len].offsetTop) {}
    menuLi.forEach((sec) => sec.classList.remove("active"));
    menuLi[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);


// === Sticky Navbar ===
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 50);
});


// === Toggle Navbar Menu ===
const menuIcon = document.querySelector("#menu-icon");
const navList = document.querySelector(".navlist");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x");
    navList.classList.toggle("open");
};

window.onscroll = () => {
    menuIcon.classList.remove("bx-x");
    navList.classList.remove("open");
};


// === Parallax Animation ===
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show-items");
        } else {
            entry.target.classList.remove("show-items");
        }
    });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));


// === Form Validation and Email Sending ===
const from = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const country = document.getElementById('country');
const number = document.getElementById('number');
const message = document.getElementById('message');

function sendEmail() {
    const bodyMessage = `Name: ${fullname.value}<br> Email: ${email.value}<br> Country: ${country.value}<br> Phone Number: ${number.value}<br> Message: ${message.value}<br>`;

    // Use EmailJS service to send the email
    emailjs.send("service_e28ucum", "template_ylpjo7o", {
        name: fullname.value,
        email: email.value,
        country: country.value,
        number: number.value,
        message: message.value,
    })    .then((response) => {
        console.log("Email sent successfully:", response);
        Swal.fire({
            title: "Success!",
            text: "Message sent successfully!",
            icon: "success"
        });
    }, (error) => {
        console.error("Error sending email:", error);
        Swal.fire({
            title: "Error!",
            text: "Message not sent. Please try again.",
            icon: "error"
        });
    });
}

function checkInputs() {
    const items = document.querySelectorAll(".item");

    for (const item of items) {
        if (item.value == "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        }

        if (items[1].value != "") {
            checkEmail();
        }
        items[1].addEventListener("keyup", () => {
            checkEmail();
        });

        item.addEventListener("keyup", () => {
            if (item.value != "") {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            } else {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            }
        });
    }
}

function checkEmail() {
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;

    if (!email.value.match(emailRegex)) {
        email.classList.add("error");
        email.parentElement.classList.add("error");
    } else {
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }
}

from.addEventListener("submit", (e) => {
    e.preventDefault();
    checkInputs();

    if (email.value.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
        sendEmail(); // Send email after validation
    }
});