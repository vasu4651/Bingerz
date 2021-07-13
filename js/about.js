const hamburger = document.querySelector('.hamburger');
const navItems = document.querySelector('.nav-items');


hamburger.addEventListener('click', () =>{
    navItems.classList.toggle('show');
    if(navItems.classList.contains('show'))
        hamburger.innerHTML = `<i class="fa fa-close"></i>`;
    else
        hamburger.innerHTML = `<i class="fas fa-bars"></i>`;
})

window.addEventListener('scroll' , () => {
    let header = document.querySelector('header');
    header.classList.toggle('scroll-active' , window.scrollY > 0);
})