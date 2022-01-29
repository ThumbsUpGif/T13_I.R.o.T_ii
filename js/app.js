import { cdnUrl, projectID } from './env.js';
import { handleImage, handleParagraphs } from './utils.js';

function init() {
    const urlString = window.location.search;
    const paramsUrl = new URLSearchParams(urlString);
    const pageValue = paramsUrl.get('page')

    const burgerIcon = document.querySelector('.burger-icon');
    const mobileNav = document.querySelector('.mobile-nav');
    burgerIcon.addEventListener('click', () => {
        mobileNav.classList.toggle('mobile-nav-hide');
        burgerIcon.classList.toggle('burger');
        burgerIcon.classList.toggle('closemobilemenu');
    });

    if(pageValue === null) {
        getPosts(); 
    } else {
        getPost(pageValue);
    }
}

// følgende er funksjonen for å hente en singel post/projekt

async function getPost(pageValue) {
    const project = document.querySelector('.project');
    const post = await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [slug.current == "${pageValue}"]
    `);
    const { result } = await post.json();
    project.append(handleImage(result[0].mainImage.asset._ref));
    const title = document.createElement('h1');
    title.innerText = result[0].title;
    project.append(title)
    project.append(handleParagraphs(result[0].body));
}


// bygge alle blokker i forsiden som representer prosjekter 
async function getPosts() {
     const posts =  await fetch(`https://${projectID}.api.sanity.io/v1/data/query/production?query=*
    [_type == "post"]
    `);
    const { result } = await posts.json();
    const worksList = document.querySelector('.workslist');

    result.forEach(post => {
        
        const workBlock = document.createElement('a'); //
        workBlock.classList.add('work'); // 
        workBlock.setAttribute(
            'href', 
            `./work.html?page=${post.slug.current}`
        ); 
        
        const workTitle = document.createElement('h2'); // 
        workTitle.classList.add('work-title'); // 
        workTitle.innerText = post.title; // 
        workBlock.append(workTitle); // 
        const workMask = document.createElement('div'); // 
        workMask.classList.add('work-mask'); // 
        workBlock.append(workMask); // 

        const workCover = document.createElement('img'); // 
        const cover = post.mainImage.asset._ref.split('-'); // h
        workCover.setAttribute('src', `${cdnUrl}${cover[1]}-${cover[2]}.${cover[3]}`);
        workCover.classList.add('work-cover'); 
        
        workBlock.append(handleImage(post.mainImage.asset._ref, 'work-cover'));
        
        worksList.append(workBlock); // 
    });

}

init();