function determineColor(name){
    let color
    switch(name) {
        case "social":
            color= "rgb(246,224,94, 0.7)";
            break;
        case "discover":
            color=  "rgb(29, 103, 187, 0.5)";
            break;
        default:
            color=  "rgb(4, 180, 86, 0.5)";
    }
    return color  
}

export {
    determineColor
}