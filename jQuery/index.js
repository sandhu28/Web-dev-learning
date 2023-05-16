$(document).ready(function(){
    $('h1').css('color','red');
})

console.log($('h1').css('font-size'))

$('h1').addClass("big-title margin-50");

console.log($('h1').hasClass("margin-50"));

$('h1').text('Bye');

$('button').text('Dont click me');

$('button').html("<em>Hey</em>");

console.log($('a').attr('href'))

$('a').attr('href','https://www.yahoo.com')

console.log(typeof($('h1').attr('class')))

// event listeners

$('h1').click(function(){
    $('h1').css('color','purple')
})

$('button').click(function(){
    $('h1').css('color','purple')
})

console.log(($('button')[0]))

$('input').keypress(function(event){
    console.log(event.key)
})

$(document).keypress(function(event){
    $('h1').text(event.key)
})

$('h1').on("mouseover",function(){
    $('h1').css('color','purple')
})

// add elements or delete elements 

$('h1').before("<button>New</button>");

$('h1').after("<button>New</button>");

$('h1').prepend("<button>New</button>");

$('h1').append("<button>New</button>");

// remove buttons using jquery

// $('button').remove();


// animations

// $('button').on("click",function(){
//     $('h1').fadeOut()
// })

// $('button').on("click",function(){
//     $('h1').fadeToggle()
// })

// $('button').on("click",function(){
//     $('h1').slideUp()
// })

// $('button').on("click",function(){
//     $('h1').slideToggle()
// })

// $('button').on("click",function(){
//     $('h1').animate({opacity: 0.5});
// })

$('button').on("click",function(){
    $('h1').slideUp().slideDown().animate({opacity: 0.5});
})




