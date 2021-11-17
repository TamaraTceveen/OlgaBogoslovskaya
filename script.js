const breakpoint = window.matchMedia('(min-width:1200px)');
const breakpointMobil = window.matchMedia('(max-width:767px)');
let swiperPrice, swiperEducation;

const userName = document.getElementById("user_name");
const userPhone = document.getElementById("user_phone");
const userMail = document.getElementById("user_email");
const formBtn = document.getElementById("submit__application");

const mainForm = document.forms.main;
const mainFormEmail = mainForm.user_email;
const mainFormPhone = mainForm.user_phone;
let thanks = document.getElementById("form__thanks");

let openNavBlock = document.getElementById("openNav");
let closeNavBlock = document.getElementById("closeNav");
let menuHeight = document.getElementById("mySidenav");
let helpMobile = document.getElementById("helpMobile");
const screenHeight = window.screen.height;

const me = document.getElementById("meLink");

openNavBlock.addEventListener("click", openNav);
closeNavBlock.addEventListener("click", closeNav);
me.addEventListener("click", closeNav);

window.addEventListener('scroll', function () {
    if (pageYOffset > screenHeight) {
        closeNavBlock.click();
    };
});

helpMobile.addEventListener("click", function () {
    var content = this.nextElementSibling;
    this.classList.toggle("help_active");
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
})


let swiper = new Swiper('.mySwiperReview', {
    cssMode: true,
    speed: 600,
    loop: true,
    parallax: true,
    mousewheel: {
        releaseOnEdges: true,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    mousewheel: true,
    keyboard: true,
});

const enableSwiper = function () {
    swiperPrice = new Swiper('.mySwiperPrice', {
        cssMode: true,
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        mousewheel: true,
        keyboard: true,
    })
};

const enableSwiperEducation = function () {
    swiperEducation = new Swiper('.mySwiperEducation', {
        cssMode: true,
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        mousewheel: true,
        keyboard: true,
    })
};

mainForm.addEventListener("submit", function (event) {

    if (emailTest(mainFormEmail)) {

        userMail.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="main-form__error">
				Введите e-mail
			</div>`
        );
        event.preventDefault();
    };
    if (phoneTest(mainFormPhone)) {

        userPhone.parentElement.insertAdjacentHTML(
            "beforeend",
            `<div class="main-form__error">
				Введите телефон
			</div>`
        );
        event.preventDefault();
    };
});


async function makeRequest() {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'telegram.php');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            'user_name': userName.value,
            'user_phone': userPhone.value,
            'user_email': userMail.value
        }));
    })
}

let send = async function () {
    await makeRequest();
    formBtn.setAttribute("class", "hide");
    thanks.setAttribute("class", "show");
    userName.value = '';
    userPhone.value = '';
    userMail.value = '';

}

const breakpointChecker = function () {
    if (breakpoint.matches === true) {

        if (swiperPrice !== undefined) swiperPrice.destroy(true, true);

        return;

    } else if (breakpoint.matches === false) {

        enableSwiper();
    }

    if (breakpointMobil.matches === false) {
        console.log('check');
        if (swiperEducation !== undefined) swiperEducation.destroy(true, true);

        return;

    } else if (breakpointMobil.matches === true) {

        enableSwiperEducation();
    }
};


breakpoint.addListener(breakpointChecker);
breakpointMobil.addListener(breakpointChecker);

breakpointChecker();

function openNav() {
    document.getElementById("mySidenav").style.right = "0";
    document.getElementById("mySidenav").style.width = "100vw";
}

function closeNav() {
    document.getElementById("mySidenav").style.right = "-100vw";
    document.getElementById("mySidenav").style.width = "0";
}

function emailTest(input) {
    if (input.value.length == 0) {
        input.value = 'no email';
    } else {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
};


function phoneTest(input) {
    
    input.value = input.value.replace(/[-()\s]/g, "");
let phone = input.value;
    if (phone[0] == 8) {
        console.log("phone if");
        phone = phone.replace('8', '7');
        console.log(phone);
        input.value = phone;
    }
    if (input.value[0] !== '+') {
        input.value = "+" + input.value;
    }
    return !/^\+\d{11}$/.test(input.value);
}


