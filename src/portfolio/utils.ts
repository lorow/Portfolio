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