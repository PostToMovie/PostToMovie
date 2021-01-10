

const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelector('contents_box .contents');



heart.addEventListener('click',function(){
    heart.classList.toggle('on');
});

function resizeFunc(){

    console.log('resize!')
    if(pageYOffset >=10){
        console.log(window.innerWidth);
        let calcwidth = (window.innerWidth*0.5)+167;

        sidebox.style.left = calcwidth+'px';
    }
    variableWidth.style.width = window.innerWidth + 'px';
}



function scrollFunc(){
    // console.log(pageYOffset);
    if(pageYOffset>=10){
        header.classList.add('on');
        sidebox.classList.add('on');
        resizeFunc();

    }else{
        header.classList.remove('on');
        sidebox.classList.remove('on');
        sidebox.removeAttribute('style');

    }
}

window.addEventListener('resize',resizeFunc);
window.addEventListener('scroll',scrollFunc);