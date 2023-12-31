import file from '../testingPage/getFile.js';

const app = {

    scroll: function() {
        const headerTittleElement = document.querySelector(".header_section");
        const menuNavigationElements = document.querySelectorAll(".header_section nav a");
        const headerH1Element = document.querySelector('#header_section-h1');
        window.addEventListener("scroll", () => {
            headerTittleElement.classList.add("scrollHeader");
            if (window.scrollY === 0 || window >= 1) {
                headerTittleElement.classList.remove("scrollHeader");
                headerH1Element.style.fontSize ="7rem";
                headerH1Element.style.fontFamily = "'Caveat', cursive";
                headerH1Element.style.fontWeight = "700";
                headerH1Element.classList.remove('scrollUppercase');
    
            }
            if (window.scrollY > 1) {
                headerH1Element.style.fontSize = "1rem";
                headerH1Element.style.fontFamily = "'Poppins', sans-serif";
                headerH1Element.style.fontWeight = "500";
                headerH1Element.classList.add('scrollUppercase');
                
            };
    
            if (window.scrollY <= 700) {
                menuNavigationElements[1].style.color = "red";
                menuNavigationElements[1].addEventListener('mouseover', () => {
                    menuNavigationElements[1].style.color = "white";
                })
                menuNavigationElements[1].addEventListener('mouseleave', () => {
                    menuNavigationElements[1].style.color = "red";
                })
            };
        
            if (window.scrollY >= 700) {
                // menuNavigationElements[1].style.color = "#781212";
                menuNavigationElements[1].style.color = "#550d0d";
                menuNavigationElements[1].addEventListener('mouseover', () => {
                    menuNavigationElements[1].style.color = "white";
                })
                menuNavigationElements[1].addEventListener('mouseleave', () => {
                    menuNavigationElements[1].style.color = "#550d0d";
                })
            };
        });
    },
    hoverArticle: () => {
        const homeArticleElements = document.querySelectorAll('.main-section-ul--li');
        const iconArticleElements = document.querySelectorAll('.main-section-ul--li i');
        homeArticleElements.forEach(article => {
            article.addEventListener('mouseover', () => {
                const iconElement = article.querySelector('i');
                iconElement.classList.add('test');
            });
            article.addEventListener('mouseleave', () => {
                const iconElement = article.querySelector('i');
                console.log(iconElement);
                iconElement.classList.remove('test');
            })
        });
    },
    init: ()=> {
        app.scroll();
        app.hoverArticle();
    }
}

app.init();
