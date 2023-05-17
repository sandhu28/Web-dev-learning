
// module.exports.getDate = getDate;

const getDate = function(){


    const date = new Date();
    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    return date.toLocaleDateString('en-US',options);

}

exports.getDate = getDate;
    

// module.exports.getDate = function(){


//     const date = new Date();
//     const options = {
//         weekday: 'long',
//         day: 'numeric',
//         month: 'long',
//         year: 'numeric'
//     };

//     const day = date.toLocaleDateString('en-US',options);

//     return day;

// }

module.exports.getDay = getDay;

function getDay(){


    const date = new Date();
    const options = {
        weekday: 'long',
    };
    
    return date.toLocaleDateString('en-US',options);

    
}