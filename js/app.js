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

console.log("project ID = " + projectID)
console.log(cocktail)
console.log(beer)


function init() {

    if (pageValue === null) {
        // getDrinks(cocktail); // cocktail
        // getDrinks(beer); // beer
        getDrinks();
    } else {
        getDrink(pageValue);
    }
}




//// Menu page solo presentation

async function getDrink(pageValue) {

    const drinkPresentation = document.querySelector('.drink-presentation');
    const drink = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
        [slug.current == "${pageValue}"]
        `);
    const { result } = await drink.json();


    // ADD DOM MANIPULATION HERE !!!


    console.log("bonjour tout le monde!")
}



//// Front page tile presentation

async function getDrinks() {

    const drinks = await fetch(`https:///${projectID}.api.sanity.io/v1/data/query/production?query=*
    [_type == "drink" && categories._ref == "${type}"]
    `);

    const { result } = await drinks.json();

    const cocktailList = document.querySelector('.cocktail-menu');
    console.log(cocktailList)

    const beerList = document.querySelector('.beer-menu');
    console.log(beerList)


    result.forEach(drink => {

        const menuTile = document.createElement('a');
        menuTile.classList.add('menu-tile');
        menuTile.setAttribute(
            'href',
            `./menu.html?page=${drink.slug.current}` // Do I need to change this?
        );


        const tileTitle = document.createElement('h2');
        tileTitle.classList.add('menu-tile-title');
        tileTitle.innerText = drink.title;
        menuTile.append(tileTitle);
        const tileMask = document.createElement('div');
        tileMask.classList.add('menu-tile-mask');
        menuTile.append(tileMask);

        const tileCover = document.createElement('img');
        const cover = drink.mainImage.asset._ref.split('-');
        tileCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
        tileCover.classList.add('tile-cover');
        menuTile.append(handleImage(drink.mainImage.asset._ref, 'tile-cover'));

        cocktailList.append(menuTile);


        // const tileTitle = document.createElement('h2');
        // tileTitle.classList.add('tile-title');
        // tileTitle.innerText = drink.title;
        // menuTile.append(tileTitle);
        // const tileMask = document.createElement('div');
        // tileMask.classList.add('tile-mask');
        // menuTile.append(tileMask);

        // const tileCover = document.createElement('img');
        // const cover = drink.mainImage.asset._ref.split('-');
        // tileCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
        // tileCover.classList.add('tile-cover');
        // menuTile.append(handleImage(drink.mainImage.asset._ref, 'tile-cover'));

        // beerList.append(menuTile);

    });

}

init();