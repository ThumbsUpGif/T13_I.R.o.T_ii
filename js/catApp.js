
   
// import { cdnUrl, projectID } from './env';
// import { handleImage } from './utils.js';
// import { handleParagraphs } from './utils.js';




function init() {
    const urlString = window.location.search;
    const paramsUrl = new URLSearchParams(urlString);
    const pageValue = paramsUrl.get('page')
    const typePage = paramsUrl.get('type')


    const burgerIcon = document.querySelector('.burger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    burgerIcon.addEventListener('click', () => {
        mobileNav.classList.toggle('mobile-nav-hide');
        burgerIcon.classList.toggle('burger');
        burgerIcon.classList.toggle('closemobilemenu');
    });


    console.log('hello world!')

    if(pageValue === null) {
        getDrinks("1023104d-c346-4a64-b227-e213d2669ede");
        getDrinks("b36ab5ed-e50e-42be-8ab4-15e270c114f1");
    } else {
        getPost(pageValue);
    }

  
}











// her definer noen generisk variabler: den første er cdn (content distribution network)
// her inne sanity lagre bilder vi lastet opp i sanity platform
// const cdnUrl = 'https://cdn.sanity.io/images/a9leofex/production/';

async function getPost(pageValue) {
    const project = document.querySelector('.project');
    const catStudy = await fetch(`https://a9leofex.api.sanity.io/v1/data/query/production?query=*
    [slug.current == "${pageValue}"]
    `);
    const { result } = await catStudy.json();
   
    // const imgCover = result[0].mainImage.asset._ref.split('-'); // her har vi array med 4 verdi av bildet
    // vi trenger fast url av cdn + verdi i index 1, 2 og 3
    /*['image', 'dsefs45tfsrgfg5ge', '1200x800', 'jpg'] eksempel av cover
    */
    // const cover = document.createElement('img');
    // cover.setAttribute('src', `${cdnUrl}${imgCover[1]}-${imgCover[2]}.${imgCover[3]}`)
    // console.log(cover)
    project.append(handleImage(result[0].mainImage.asset._ref, 'token-class'))

    const title = document.createElement('h1');
    title.innerText = result[0].title;
    project.append(title)
    console.log(title)

    const intro = document.createElement('h5');
    intro.innerText = result[0].intro;
    project.append(intro);
    console.log(intro)

    // const paragraph = document.createElement('p');
    // paragraph.innerText = result[0].paragraph;
    // project.append(paragraph);
    // console.log(paragraph)

    const card = document.createElement('p');
    card.innerHTML = result[0].card;
    project.append(card)

 
    project.append(handleParagraphs(result[0].body));
   

    console.log('bonjour tout le monde!')
}




// følgende er en async støtte funksjon for å hente data fra sanity
// bygge alle blokker i forsiden som representer prosjekter
// funksjonen må være asynkron siden innhenting kan ta tid (millisekunder) 
async function getDrinks(type) {
    console.log(type)
    /* her lager vi en variabel hvor vi lagre inn data som kommer fra sanity.io
    fetch er javascript funksjon som venter på url argument 
    i vår tilfeldig url er sanity endpoint med query for filtrere bare post (prosjekter) 
    siden fetch er en "Promise" må vi bruke await [_type == "post"] filtrerer bare content type "post"*/
    const catStudies =  await fetch(`https:///a9leofex.api.sanity.io/v1/data/query/production?query=*
    [_type == "drink" && categories._ref == "${type}"]
    `);
    /* etter fetch har ferdig returnere en http response objekt og vi henter ut av det
    result underobjekt ved hjelp av en til funksjon av javascript json()*/
    const { result } = await catStudies.json();
    /* result er nå en array av objekter med data vi skriver i vår sanity.studio */


    // her definerer vi inn i en variabel hvor vi kommer til å bygge de blokkene med prosjekter
    const worksList = document.querySelector('.workslist');

    // nå trenger vi å loop inn i resultat fra sanity med en forEach
    // forEach går gjennom hele array av objekter og sender til en funksjon en objekt etter hverandre
    // jeg kalte "post" hver objekt som er sent in in forEach
    // så "post" innholder verdi av hver eneste prosjekt
    result.forEach(catStudy => {

        // vi begynne å bygge block med createElement og blokken er en <a href="">
        const workBlock = document.createElement('a'); // vi bygget her <a></a>
        workBlock.classList.add('work'); // vi legger til en class til <a class="work"></a>
        workBlock.setAttribute(
            'href', 
            `./work.html?page=${catStudy.slug.current}`
        ); // her legge vi til attribute href med slug verdi inn <a class="work" href="./work.html/tittel-2"

        // vi trenger en h2 element inn i hoved block
        const workTitle = document.createElement('h2'); // vi lagd <h2></h2> her
        workTitle.classList.add('work-title'); // <h2 class="work-title"></h2>
        workTitle.innerHTML ="&nbsp;&nbsp;" + catStudy.title + "&nbsp;&nbsp;"; // inn i tag skriver vi verdi fra post.title
        workBlock.append(workTitle); // vi legger til h2 element inn i <a> block
        const workMask = document.createElement('div'); // vi lager div mask
        workMask.classList.add('work-mask'); // <div class="work-mask"></div>
        workBlock.append(workMask); // og legge vi inn <div> inn i <a> block
        const workCover = document.createElement('img'); // her bigger vi element img
        // som trenger en attribute image fra sanity objekt
        // med split for jeg ut veriene for å bygge url av bildet
        const cover = catStudy.mainImage.asset._ref.split('-'); // her har vi array med 4 verdi av bildet
        // vi trenger fast url av cdn + verdi i index 1, 2 og 3
        /*['image', 'dsefs45tfsrgfg5ge', '1200x800', 'jpg'] eksempel av cover
        */
        workCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
        workCover.classList.add('work-cover'); // legge vi til class til img tag
        workBlock.append(workCover); // legge vi inn img inn i <a> block
        worksList.append(workBlock); // til slutt legge vi inn hele <a> block inn i worklist section
    
        
        console.log('Moi!')

    });

   

}

init();


const projectID = 'a9leofex'
const cdnUrl = `https://cdn.sanity.io/images/${projectID}/production/`;




// vi trenger en støtte funksjon som håndtere objekt av block element
function handleParagraphs(body) {
    const text = document.createElement('article');
    if (body) {
        body.map(p => {
            if(p._type === 'block') {
              const newp = document.createElement('p');
              newp.innerText = p.children[0].text;
              text.append(newp); 
            }
            if(p._type === 'image') {
                text.append(handleImage(p.asset._ref, 'project-image'))
            }
        })
    };
    return text;
}

function handleImage(keyImage, customClass = 'basic-image') {
    // vi trenger fast url av cdn + verdi i index 1, 2 og 3
    /*['image', 'dsefs45tfsrgfg5ge', '1200x800', 'jpg'] eksempel av cover
    */
    const imageArray = keyImage.split('-');
    const image = document.createElement('img');
    image.classList.add(customClass);
    image.setAttribute('src', `${cdnUrl}${imageArray[1]}-${imageArray[2]}.${imageArray[3]}`);
    return image;
}