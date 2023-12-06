export enum availableSections {
    index,
    projects,
    blog,
    about,
}

export function getScrollPercent() {
    var documentElement = document.documentElement;
    var body = document.body;
    
    return (documentElement["scrollTop"]||body["scrollTop"]) / ((documentElement["scrollHeight"]||body["scrollHeight"]) - documentElement.clientHeight) * 100;
}

const sectionNameToNumber: any = {
    "home" : 1,
    "projects" : 2,
    "blog" : 3,
    "about" : 4,
};
const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export function smoothStep(edge0: number, edge1: number, x: number){
    x = clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return x * x * (3 - 2 * x);
}

export {sectionNameToNumber}