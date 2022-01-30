


function presentMenu() {

    const drinkPresentation = document.querySelector('.drink-presentation');
    
    
    document.body.classList.add("cocktail-background"); // CANCEL OUT LATER!

    // if (category._ref == cocktail) {
    //     document.body.classList.add("cocktail-background");
    // } else {
    //     document.body.classList.add("beer-background");
    // }


    const returnButton = document.createElement('a');
    returnButton.classList.add('drink-presentation__return-button');
    returnButton.href = "../index.html";
    drinkPresentation.append(returnButton);

    const returnButtonIcon = document.createElement('img');
    // returnButtonIcon.('src', `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`);
    returnButtonIcon.setAttribute('src', '../assets/cross-thin.svg'); // CANCEL OUT LATER!
    returnButton.append(returnButtonIcon);

    const topHalf = document.createElement('div');
    topHalf.classList.add('drink-presentation__cocktail__top-half');
    drinkPresentation.append(topHalf);

    const topHalfLeft = document.createElement('div');
    topHalfLeft.classList.add('drink-presentation__cocktail__top-half__left');
    // topHalfLeft.innerText = result[0].title;
    topHalfLeft.innerHTML = '<h1>Manhattan<h1>'; // CANCEL OUT LATER!
    topHalf.append(topHalfLeft)

    const topHalfRight = document.createElement('div');
    topHalfRight.classList.add('drink-presentation__cocktail__top-half__right');
    topHalf.append(topHalfRight)

    const drinkPresentationPhoto = document.createElement('img');
    // drinkPresentationPhoto.setAttribute('src', `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`);
    drinkPresentationPhoto.setAttribute('src', '../assets/Manhattan.jpg'); // CANCEL OUT LATER!
    topHalfRight.appendChild(drinkPresentationPhoto);

    const bottomHalf = document.createElement('div');
    bottomHalf.classList.add('drink-presentation__cocktail__bottom-half')
    // topHalfLeft.innerText = result[0].body;
    bottomHalf.innerHTML = '<p>Lorem Ipsum<p>'; // CANCEL OUT LATER!
    drinkPresentation.append(bottomHalf);


}

presentMenu();