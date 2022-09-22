export const responsiveCarousel = () => {
    const { innerWidth } = window
    if(innerWidth >= 1300) return 4
    else if(innerWidth >= 700) return 3
    else if(innerWidth >= 560) return 2
    else return 1
}