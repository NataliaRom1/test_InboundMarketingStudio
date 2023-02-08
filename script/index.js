let newCardsArray = [];
const carouselTrackElement = document.querySelector('.carousel__track');
const carouselContainerElement = document.querySelector('.carousel__container');
const prevBtnElement = document.querySelector('.carousel__btn_direction_left');
const nextBtnElement = document.querySelector('.carousel__btn_direction_right');
const cardsSection = document.querySelector('.cards');
const initialCardsElements = cardsSection.querySelectorAll('.card');
const cardTitleElements = cardsSection.querySelectorAll('.card__heading');
const cardOneLineTitleElements = cardsSection.querySelectorAll('.card__heading_num-of-lines_one');
const cardTextElements = cardsSection.querySelectorAll('.card__text');
let screenWidth = document.documentElement.clientWidth;

const changeNumberOfSymbolsTitle = function () {
  if (screenWidth <= 767 && screenWidth >= 576) {
    for (let i = 0; i < cardTitleElements.length; i++) {
      cardTitleElements[i].innerHTML = cardTitleElements[i].textContent.slice(0, 25) + "&nbsp;" + cardTitleElements[i].textContent.slice(26, 67) + "&nbsp;" + cardTitleElements[i].textContent.slice(68, 72);
    }
  } else if (screenWidth >= 768 && screenWidth <= 1199) {
    for (let i = 0; i < cardTitleElements.length; i++) {
      cardTitleElements[i].textContent = cardTitleElements[i].textContent.slice(0, 42);
    }
  } else if (screenWidth >= 1200) {
    for (let i = 0; i < cardTitleElements.length; i++) {
      cardTitleElements[i].textContent = cardTitleElements[i].textContent.slice(0, 42);
    }
    for (let i = 0; i < cardOneLineTitleElements.length; i++) {
      cardOneLineTitleElements[i].innerHTML = cardOneLineTitleElements[i].textContent.slice(0, 25);
    }
  }
}

changeNumberOfSymbolsTitle();

const changeNumberOfSymbolsText = function () {
  if (screenWidth <= 767 && screenWidth >= 576) {
    for (let i = 0; i < cardTextElements.length; i++) {
      cardTextElements[i].textContent = cardTextElements[i].textContent.slice(0, 61) + "...";
    }
  } else if (screenWidth >= 1200) {
    for (let i = 0; i < cardTextElements.length; i++) {
      cardTextElements[i].textContent = cardTextElements[i].textContent.slice(0, 84);
    }
  }
}

changeNumberOfSymbolsText();

// создаю массив карточек
for (let i = 0; i < initialCardsElements.length; i++) {
  newCardsArray.push(initialCardsElements[i]);
}

// копирует карточку из секции cards
const copyCard = function (card) {
  const cardElements = card.cloneNode(true);
  if (screenWidth >= 1200) {
    cardElements.classList.remove('card_hide-on-big-screen');
  }
  return cardElements;
}

// функция добавляет данные на страницу с конца
const addCard = function (card) {
  carouselTrackElement.append(copyCard(card));
}

//Перебираю массив
newCardsArray.forEach((card) => {
  addCard(card);
});

const cardElement = carouselTrackElement.querySelector('.card');
const cardElements = carouselContainerElement.querySelectorAll('.card');
let stepWidth = cardElement.offsetWidth + parseInt(window.getComputedStyle(carouselTrackElement).gap);
let stepCount = 1;
let position = 0; // положение ленты прокрутки

const showCurrentSlide = function () {
  position += stepWidth * stepCount;
  position = Math.min(position, 0);
  carouselTrackElement.style.marginLeft = position + 'px';
}

const maxDisplacement = -(cardElement.offsetWidth * cardElements.length + parseInt(window.getComputedStyle(carouselTrackElement).gap) * (cardElements.length - 1)) + carouselTrackElement.offsetWidth;

const showNextSlide = function () {
  if (position <= maxDisplacement) {
    position;
  } else {
    position -= stepWidth * stepCount;
    position = Math.max(position, -stepWidth * (cardElements.length - stepCount));
  }
  carouselTrackElement.style.marginLeft = position + 'px';
};

prevBtnElement.addEventListener('click', () => showCurrentSlide());
nextBtnElement.addEventListener('click', () => showNextSlide());