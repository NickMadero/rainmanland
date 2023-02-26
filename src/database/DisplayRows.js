
var express = require('express');
var sphp = require('sphp');

var app = express();
var server = app.listen(8080);

app.use(sphp.express('public/'));
app.use(express.static('public/'));

// var tree = document.createDocumentFragment();


var jsonData;

function functCall() {
    //console.log("clicked");

    $.ajax(
        'database/databaseQuery.php',
        {
            success: function (data) {
                // alert('AJAX call was successful!');
                // alert('Data from the server' + data);
                //    console.log(data);
                jsonData = JSON.parse(data);
                parseData(jsonData);
            },
            error: function () {
                // alert('There was some error performing the AJAX call!');
            }
        }
    );
}


function parseData(data) {

    console.log(data);

    for (let i = 0; i < data.length; i++) {
        let obj = data[i];
        // console.log(obj.id +" ");
        // console.log(obj.author +" ");
        // console.log(obj.publishDate +" ");
        // console.log(obj.source +" ");
        // console.log(obj.title +" ");
        // console.log(obj.body +"\n");

        if (obj.id == null)
            obj.id = "";
        if (obj.author == null)
            obj.author = "";
        if (obj.publishDate == null)
            obj.publishDate = "";
        if (obj.source == null)
            obj.source = "";
        if (obj.title == null)
            obj.title = "";
        if(obj.award == null)
            obj.award = 0;
        if (obj.body == null)
            obj.body = "";

        // console.log(obj.source);
        //console.log(obj.publishDate.substring(0, 4));
        // console.log("shkudjg");

        tree.append(createArticleNode(obj.id, obj.author, obj.publishDate, obj.source, obj.title, obj.award, obj.body));
    }


    document.getElementById("newsSection").append(tree);

}


//document.getElementById("newsSection").appendChild(createBlock("title", "body"));


// for (let index = 0; index < 10; index++) {

//     document.getElementById("newsSection").appendChild(createBlock("title" + index, "body"));

// }

//continue to fix layout and add access to database

var left = true;

function createArticleNode(id, author, publishDate, source, title, award, body) {
    var div = document.createElement("div");
    var service = document.createElement("div");
    var artTitle = document.createElement("h2");
    var authorName = document.createElement("h4");
    var pubDate = document.createElement("h4")
    var link = document.createElement("body");
    var content = document.createElement("p");
    var imageBody = document.createElement("div");

    artTitle.appendChild(document.createTextNode(title));

    authorName.appendChild(document.createTextNode(author));

    pubDate.appendChild(document.createTextNode(publishDate.substring(0, publishDate.indexOf(' '))));

    // link.appendChild(document.createTextNode(source));
    var a = document.createElement("a");
    a.href = source;
    a.title = source;
    a.textContent = source;
    // link.setAttribute("");
    link.appendChild(a);
    link.setAttribute("style", "margin-bottom: 10px");


    content.appendChild(document.createTextNode(""));
    content.classList.add("bodyTag");
    content.innerHTML += body;

    // content.style.color = "#A6A7AA";
    // content.style.fontSize = 13.5;
    // content.style.fontFamily = "Arial"

    // console.log(content);


    div.setAttribute("row", "row-space-1 margin-b-10");

    div.style.marginBottom = "15px";

    div.setAttribute("col", "col-sm-12 sm-margin-b-2");

    service.setAttribute("class", "service");
    service.setAttribute("data-height", "height");
    // service.setAttribute("style","visibility: shown; animation-delay: 0.1s; animation-name: fadeInRight;");

    //image logo stuff
    var awardLogo = document.createElement("IMG");
    awardLogo.src = "Pictures/ASnTAwarded.png";
    awardLogo.alt = "AS&T Award Logo";
    awardLogo.style.width = '150px';
    awardLogo.style.height = 'auto';

    imageBody.style.textAlign = 'right';
    if(award != 0){
        imageBody.appendChild(awardLogo);
    }

    var anim = document.createElement("div");
    div.classList.add('wow');
    if (left == true) {
        div.classList.add('fadeInLeft');
        left = false;
    }
    else {
        div.classList.add('fadeInRight');
        left = true;
    }
    div.classList.add('animated');
    // div.classList.add('data-wow-duration=".3"');
    // div.classList.add('data-wow-delay=".1s"');

    div.style.animationname = 'fadeInLeft';
    // anim.style.visibility = 'visible';
    // anim.style.display = 'visible';
    // anim.setAttribute('style', 'visibility:visible');
    // anim.style.setProperty('visibility', 'visible', 'important');
    // anim.id = 'artblock';
    // anim.setAttribute('visibility', 'visible !important');

    // anim.addEventListener('click', () => {
    //     anim.animate({
    //         opacity: [0, .9, 1],

    //         offset: [0, .8, 1],


    //         easing: ['ease-in', 'ease-out'],
    //     }, 2000);
    //     //     // anim.style.webkitAnimationPlayState = "running";
    //     //     anim.animate()
    //     // anim.style.animationPlayState = 'running';
    //     console.log('click');
    // });

    // window.setTimeout(() => {
    //     anim.classList.add('wow');
    //     anim.classList.add('fadeInRight');
    //     anim.classList.add('animated');
    //     anim.classList.add('data-wow-duration=".3"');
    //     anim.classList.add('data-wow-delay=".1s"');
    //     anim.style.animationname ='fadeInRight';
    //     anim.style.visibility = 'visible';
    // }, 50);

    // anim.outerHTML = "class=\"wow fadeInLeft animated\" data-wow-duration=\".3\" data-wow-delay=\".1s\" style=\"visibility: visible; animation-delay:0.1s; animation-name: fadeInLeft;\""
    // anim.setAttribute('data-wow-duration','.3');
    // anim.setAttribute('data-wow-delay','.1s');


    service.appendChild(artTitle);
    service.appendChild(authorName);
    service.appendChild(pubDate);
    service.appendChild(link);
    service.appendChild(content);
    service.appendChild(imageBody);

    anim.appendChild(service);

    div.appendChild(anim);
    // tree.append(div);

    //css style
    var sty = document.createElement('style');
    sty.innerHTML = 'p{font-size: 18px; font-weight: 400; color: #000000; margin-bottom: 15px;}';
    //    sty.innerHTML+='.footer{background-size: auto;';


    div.appendChild(sty);
    // div.id = id;

    return div;
}