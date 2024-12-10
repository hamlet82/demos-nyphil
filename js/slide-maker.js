const slides = document.querySelectorAll('.slide');

slides[0].classList.add('current');

function updateSlide(eventType) {
    let current = document.querySelector('.current');

    if (eventType != 'backward') {
        if (current.getElementsByClassName('increment').length > 0) {
            incrementSlide(eventType);
        } else {
            changeSlide(eventType);
        }
    } else {
        if (current.getElementsByClassName('incremented').length > 0) {
            incrementSlide(eventType);
        } else {
            changeSlide(eventType);
        }
    }
}

function incrementSlide(eventType) {
    let current = document.querySelector('.current');

    if ((eventType === 'click') || (eventType === 'forward')) {
        let to_increment = current.getElementsByClassName('increment')[0];
        to_increment.classList.remove('increment');
        to_increment.classList.add('incremented');
    } else if (eventType === 'backward') {
        let incrementeds = current.getElementsByClassName('incremented');
        let to_deincrement = incrementeds[incrementeds.length - 1];
        to_deincrement.classList.remove('incremented');
        to_deincrement.classList.add('increment');
    }
}

function changeSlide(eventType) {
    let current = document.querySelector('.current');

    if ((eventType === 'click') || (eventType === 'forward')) {
        if (current.nextElementSibling.classList.contains('slide')) {
            current.classList.remove('current');
            current.nextElementSibling.classList.add('current');
            let new_current = document.querySelector('.current').getAttribute('id');
        }
    } else if (eventType === 'backward') {
        if (current.previousElementSibling != null) {
            current.classList.remove('current');
            current.previousElementSibling.classList.add('current');
        }
    }
}

function goToSlide() {
    let incrementeds = document.querySelectorAll('.incremented');
    incrementeds.forEach(incremented => {
        incremented.classList.remove('incremented');
        incremented.classList.add('increment');
    });
    slides.forEach(slide => {
        slide.classList.remove('current');
    });
    let hash = location.hash.slice(1,);
    slides[hash-1].classList.add('current');
}

document.addEventListener('keydown', (e) => {
    if ((e.key === 'ArrowRight') || (e.key === 'ArrowDown')){
        updateSlide('forward');
    } else if ((e.key === 'ArrowLeft') || (e.key === 'ArrowUp')){
        updateSlide('backward');
    }
});

document.addEventListener('click', (e) => {
    updateSlide('click');
});

window.addEventListener('hashchange', () => {
    goToSlide();
});
