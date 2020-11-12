function determineColor(name){
    let color
    switch(name) {
        case "social":
            color= "#f6e05e";
            break;
        case "discover":
            color=  "#5e80f8";
            break;
        default:
            color=  "#12f47a";
    }
    return color  
}

export {
    determineColor
}