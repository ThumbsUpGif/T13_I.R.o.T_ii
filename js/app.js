import {
    cdnUrl,
    projectID,
} from './env.js';

import {
    handleImage,
    handleParagraphs
} from './utils.js';

console.log('Hello World!')



function init() {
    const urlString = window.location.search;
    const paramsUrl = new URLSearchParams(urlString);
    const pageValue = paramsUrl.get('page')


    if (pageValue === null) {
        getPosts();
    } else {
        getPost(pageValue);
    }

}



// MENU DETAIL

async function getPost(pageValue) {

    const drinkPresentation = document.querySelector('.drink-presentation');

    const post = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [slug.current == "${pageValue}"]
    `);


    const { result } = await post.json();

    //Make different background depending on category of drink
    const currentBackground = result[0].categories[0]._ref === 'b36ab5ed-e50e-42be-8ab4-15e270c114f1' 
        ? 'cocktail-background'
        : 'beer-background';
  
    const bodyEl = document.querySelector('body');
    bodyEl.classList.add(currentBackground); 


    const returnButton = document.createElement('a');
    returnButton.classList.add('drink-presentation__return-button');
    returnButton.href = "https://thumbsupgif.github.io/T13_I.R.o.T_ii/index.html";
    drinkPresentation.append(returnButton);

    const returnButtonIcon = document.createElement('img');
    returnButtonIcon.setAttribute('src', 'https://thumbsupgif.github.io/T13_I.R.o.T_ii/assets/cross-thin.svg');
    returnButton.append(returnButtonIcon);

    const topHalf = document.createElement('div');
    topHalf.classList.add('drink-presentation__top-half');
    drinkPresentation.append(topHalf);

    //Make different layout depending on category of drink
    const currentTitle = result[0].categories[0]._ref === 'b36ab5ed-e50e-42be-8ab4-15e270c114f1' 
        ? 'drink-presentation__cocktail__top-half__left'
        : 'drink-presentation__beer__top-half__left';
  
    const topHalfLeft = document.createElement('div');
    topHalfLeft.classList.add(currentTitle);
    topHalfLeft.innerHTML = "<H1>" + result[0].title + "</H1>";
    topHalf.append(topHalfLeft)

    const topHalfRight = document.createElement('div');
    topHalfRight.classList.add('drink-presentation__top-half__right');
    topHalf.append(topHalfRight)

    topHalfRight.append(handleImage(result[0].mainImage.asset._ref));

    const bottomHalf = document.createElement('div');
    bottomHalf.classList.add('drink-presentation__cocktail__bottom-half') 
    drinkPresentation.append(bottomHalf);

    const bottomHalfLead = document.createElement('div');
    bottomHalfLead.classList.add('drink-presentation__cocktail__bottom-half__lead')
    bottomHalf.append(bottomHalfLead)
    bottomHalfLead.append(handleParagraphs(result[0].lead));

    const bottomHalfBody = document.createElement('div');
    bottomHalfBody.classList.add('drink-presentation__cocktail__bottom-half__body')
    bottomHalf.append(bottomHalfBody)
    bottomHalfBody.append(handleParagraphs(result[0].body));

} // END MENU-DETAIL



// FRONT PAGE WITH TILES

async function getPosts() {

    const posts = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [_type == "post"]
    `);

    const {
        result
    } = await posts.json();

   

    const cocktails = result.filter(post => {
        return post.categories[0]._ref === 'b36ab5ed-e50e-42be-8ab4-15e270c114f1'
    });

    const cocktailList = document.querySelector('.cocktail-menu');

    
    cocktails.forEach(post => {
        
        const tileBlock = document.createElement('a'); //
        tileBlock.classList.add('menu-tile'); // 
        tileBlock.setAttribute(
            'href',
            `./menu.html?page=${post.slug.current}`
        );

        const tileTitle = document.createElement('h2'); // 
        tileTitle.classList.add('tile-title'); // 
        tileTitle.innerHTML = "<span>"+ post.title; + "</span>" // 
        tileBlock.append(tileTitle); // 

        const tileMask = document.createElement('div'); // 
        tileMask.classList.add('tile-mask'); // 
        tileBlock.append(tileMask); // 

        const tileCover = document.createElement('img'); // 
        const cover = post.mainImage.asset._ref.split('-'); // h
        tileCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
        tileCover.classList.add('tile-cover');

        tileBlock.append(handleImage(post.mainImage.asset._ref, 'work-cover'));
     
        cocktailList.append(tileBlock); // 
        
    });



    const beers = result.filter(post => {
        return post.categories[0]._ref === '1023104d-c346-4a64-b227-e213d2669ede'
    });
    
    const beerList = document.querySelector('.beer-menu');



    beers.forEach(post => {
        
        const tileBlock = document.createElement('a'); //
        tileBlock.classList.add('menu-tile'); // 
        tileBlock.setAttribute(
            'href',
            `./menu.html?page=${post.slug.current}`
        );

        const tileTitle = document.createElement('h2'); // 
        tileTitle.classList.add('tile-title'); // 
        tileTitle.innerHTML = "<span>"+ post.title; + "</span>" // 
        tileBlock.append(tileTitle); // 

        const tileMask = document.createElement('div'); // 
        tileMask.classList.add('tile-mask'); // 
        tileBlock.append(tileMask); // 

        const tileCover = document.createElement('img'); // 
        const cover = post.mainImage.asset._ref.split('-'); // h
        tileCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
        tileCover.classList.add('tile-cover');

        tileBlock.append(handleImage(post.mainImage.asset._ref, 'work-cover'));
    
        beerList.append(tileBlock); // 
        
    });
    
}

init();