import {
    cdnUrl,
    projectID,
    cocktail,
    beer
} from './env.js';
import {
    handleImage,
    handleParagraphs
} from './utils.js';

console.log('Ciao Carlo!')

function init() {
    const urlString = window.location.search;
    const paramsUrl = new URLSearchParams(urlString);
    const pageValue = paramsUrl.get('page')

    // const burgerIcon = document.querySelector('.burger-icon');
    // const mobileNav = document.querySelector('.mobile-nav');
    // burgerIcon.addEventListener('click', () => {
    // mobileNav.classList.toggle('mobile-nav-hide');
    // burgerIcon.classList.toggle('burger');
    // burgerIcon.classList.toggle('closemobilemenu');
    // });

    if (pageValue === null) {
        getPosts();
    } else {
        getPost(pageValue);
    }


}

// følgende er funksjonen for å hente en singel post/projekt

// async function getPost(pageValue) {
//     const project = document.querySelector('.project');
//     const post = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
//     [slug.current == "${pageValue}"]
//     `);
//     const { result } = await post.json();
//     project.append(handleImage(result[0].mainImage.asset._ref));
//     const title = document.createElement('h1');
//     title.innerText = result[0].title;
//     project.append(title)
//     project.append(handleParagraphs(result[0].body));
// }


async function getPost(pageValue) {


    const drinkPresentation = document.querySelector('.drink-presentation');

    const post = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [slug.current == "${pageValue}"]
    `);


    const { result } = await post.json();

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
    returnButtonIcon.setAttribute('src', '../assets/cross-thin.svg');
    returnButton.append(returnButtonIcon);

    const topHalf = document.createElement('div');
    topHalf.classList.add('drink-presentation__cocktail__top-half');
    drinkPresentation.append(topHalf);

    const topHalfLeft = document.createElement('div');
    topHalfLeft.classList.add('drink-presentation__cocktail__top-half__left');
    topHalfLeft.innerHTML = "<H1>" + result[0].title + "</H1>";
    // topHalfLeft.innerHTML = '<h1>Manhattan<h1>'; // CANCEL OUT LATER!
    topHalf.append(topHalfLeft)

    const topHalfRight = document.createElement('div');
    topHalfRight.classList.add('drink-presentation__cocktail__top-half__right');
    topHalf.append(topHalfRight)

    topHalfRight.append(handleImage(result[0].mainImage.asset._ref));


    const bottomHalf = document.createElement('div');
    bottomHalf.classList.add('drink-presentation__cocktail__bottom-half')
    // bottomHalf.innerText = result[0].body;
    // bottomHalf.innerHTML = '<p>Lorem Ipsum<p>'; // CANCEL OUT LATER!
    drinkPresentation.append(bottomHalf);

    bottomHalf.append(handleParagraphs(result[0].body));



}


// bygge alle blokker i forsiden som representer prosjekter 
async function getPosts() {

    const posts = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [_type == "post"]
    `);

    // const posts =  await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    // [_type == "post" && categories._ref == "b36ab5ed-e50e-42be-8ab4-15e270c114f1"]
    // `);



    const {
        result
    } = await posts.json();
    
    const worksList = document.querySelector('.cocktail-menu');

    result.forEach(post => {

        const workBlock = document.createElement('a'); //
        workBlock.classList.add('menu-tile'); // 
        workBlock.setAttribute(
            'href',
            `./menu.html?page=${post.slug.current}`
        );

        const workTitle = document.createElement('h2'); // 
        workTitle.classList.add('tile-title'); // 
        workTitle.innerText = post.title; // 
        workBlock.append(workTitle); // 

        const workMask = document.createElement('div'); // 
        workMask.classList.add('tile-mask'); // 
        workBlock.append(workMask); // 

        const workCover = document.createElement('img'); // 
        const cover = post.mainImage.asset._ref.split('-'); // h
        workCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
        workCover.classList.add('tile-cover');

        workBlock.append(handleImage(post.mainImage.asset._ref, 'work-cover'));
        // workBlock.classList.add('tile-cover')

        worksList.append(workBlock); // 
    });




}

init();