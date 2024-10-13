const navs = document.querySelectorAll('.nav-list li');
const cube = document.querySelector('.box');
const sections = document.querySelectorAll('.section');

const resumeLists = document.querySelectorAll('.resume-list');
const resumeBoxs = document.querySelectorAll('.resume-box');

const portafolioLists = document.querySelectorAll('.portafolio-list');
const portafolioBoxs = document.querySelectorAll('.portafolio-box');

// navbar actions and all section actions along with cube rotation when navbar is clicked
navs.forEach((nav, idx) => {
    nav.addEventListener('click', () => {
        document.querySelector('.nav-list li.active').classList.remove('active');
        nav.classList.add('active');

        cube.style.transform = `rotateY(${idx * -90}deg)`

        document.querySelector('.section.active').classList.remove('active');
        sections[idx].classList.add('active');

        const array = Array.from(sections);
        const arrSesc = array.slice(1, -1);
        arrSesc.forEach(arrSesc => {
            if (arrSesc.classList.contains('active')) {
                sections[4].classList.add('action-contact');
            }
        });
        if (sections[0].classList.contains('active')) {
            sections[4].classList.remove('action-contact');
        }
    });
});

// resume section when clicking tab-list
resumeLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.resume-list.active').classList.remove('active');
        list.classList.add('active');

        document.querySelector('.resume-box.active').classList.remove('active');
        resumeBoxs[idx].classList.add('active');
    });
});

// portfolio section when clicking tab-list
portafolioLists.forEach((list, idx) => {
    list.addEventListener('click', () => {
        document.querySelector('.portafolio-list.active').classList.remove('active');
        list.classList.add('active');

        document.querySelector('.portafolio-box.active').classList.remove('active');
        portafolioBoxs[idx].classList.add('active');
    });
});

// visibility for contact section when reloading (cube reloading animation)
setTimeout(() => {
    sections[4].classList.remove('active');
}, 1500);
