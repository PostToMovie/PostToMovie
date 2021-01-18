

const heart = document.querySelector('.heart_btn');
const header = document.querySelector('#header');
const sidebox = document.querySelector('.side_box');
const variableWidth = document.querySelectorAll('.contents_box .contents');
const delegation = document.querySelector('.contents_box');



// heart.addEventListener('click',function(){
//     heart.classList.toggle('on');
// });

function delegationFunc(e){

    let elem = e.target;

    console.log(elem);

    while(!elem.getAttribute('data-name')){
        elem = elem.parentNode;

        if(elem.nodeName === 'BODY'){
            elem = null;
            return;
        }
    }

    if(elem.matches('[data-name="heartbeat"]')){

        console.log('하트');

        let pk = elem.getAttribute('name');

        $.ajax({
            type:'get',
            url:'data/like.json',
            data:{pk},
            dataType:'json',
            success:function(response){
                let likeCount = document.querySelector('#like-count-'+pk);
                likeCount.innerHTML = '좋아요' + response.like_count + '개';
            }
        })

    }else if(elem.matches('[data-name="bookmark"]')){

        console.log('북마크');

        let pk = elem.getAttribute('name');

        $.ajax({
            type:'post',
            url:'data/bookmark.json',
            data:{pk},
            datatype:'json',
            success:function(response){
                let likeCount = document.querySelector('#bookmark-count-'+pk);
                likeCount.innerHTML = '북마크' + response.bookmark_count + '개';
            }
        })

    } else if(elem.matches('[data-name="comment"]')){

        let content = document.querySelector('#add-comment-post37 > input[type=text').value;
        if(content.length > 140){
            alert('댓글은 최대 140자 입력 가능합니다. 현재 글자수 : ' + content.length);
            return;
        }

        $.ajax({

            type:'POST',
            url:'./comment.html',
            data:{
                'pk':37,
                'content':content,
            },
            dataType:'html',
            success:function(data) {
                document.querySelector('#comment-list-ajax-post37').insertAdjacentHTML('afterbegin',data);
            },
            error:function (request,status,error) {
                alert('문제가 발생했습니다')
            }
        })
        document.querySelector('#add-comment-post37 > input[type=text').value = '';

    } else if(elem.matches('[data-name="coment_delete"]')){

        $.ajax({
            type:'POST',
            url:'data/delete.json',
            data:{
                'pk':37,

            },
            dataType:'json',
            success:function(response){
                if(response.status){
                    console.log("클릭")
                    let comt = document.querySelector('.comment-detail')
                    comt.remove();
                }
            }
        })


    } else if(elem.matches('[data-name="follow"]')){


    }

    elem.classList.toggle('on');
}

function resizeFunc(){

    // console.log('resize!')
    if(pageYOffset >=10){
        // console.log(window.innerWidth);
        let calcwidth = (window.innerWidth*0.5)+167;

        sidebox.style.left = calcwidth+'px';
    }

    if(matchMedia('screen and (max-width : 800px').matches){

    for(let i=0; i< variableWidth.length; i++){
        variableWidth[i].style.width = window.innerWidth-20 + 'px';

    }
    }else{
        for(let i=0; i< variableWidth.length; i++){

            if(window.innerWidth>600){
                variableWidth[i].removeAttribute('style');
            }
        }
    }
}



function scrollFunc(){

    let scrollHeight = pageYOffset + window.innerHeight;
    let documentHeight = document.body.scrollHeight;

    console.log('scrollHeight:'+scrollHeight);
    console.log('yoffset:'+pageYOffset);

    console.log('documentHeight'+documentHeight);

    if(pageYOffset>=10){
        header.classList.add('on');

        if(sidebox){
        sidebox.classList.add('on');
        }

        resizeFunc();

    }else{
        header.classList.remove('on');

        if(sidebox){
        sidebox.classList.remove('on');
        sidebox.removeAttribute('style');
        }

    }

    if(scrollHeight >= documentHeight){
        let page = document.querySelector('#page').value;
        
        callMorePostAjax(page);


    }
}

function  callMorePostAjax(page) {
    $.ajax({
        type:'POST',
        url:'./post.html',
        data:{
            'page':page,
        },
        dataType:'html',
        success: addMorePostAjax,
        error:function (request,status,error) {
            alert('문제가 발생했습니다')
        }
    })
    
}

function  addMorePostAjax(data) {

    delegation.insertAdjacentHTML('beforeend',data);

}

setTimeout(function(){
    scrollTo(0,0)
},100)

if(delegation){
    delegation.addEventListener('click',delegationFunc);
}

window.addEventListener('resize',resizeFunc);
window.addEventListener('scroll',scrollFunc);