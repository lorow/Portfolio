export function debouce(func: Function, timeout = 150) { 
    let timer: number;
    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    }
}

export enum availableSections {
    index,
    projects,
    blog,
    about,
}

const sectionNameToNumber: any = {
    "home" : 1,
    "projects" : 2,
    "blog" : 3,
    "about" : 4,
};

export {sectionNameToNumber}