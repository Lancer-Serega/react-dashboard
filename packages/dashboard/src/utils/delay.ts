export const delay = (fn: (...args: any[]) => any, ms = 300) => {
    let timeout: any;

    return function (this: any, ...args: any[]) {
        if (timeout) clearInterval(timeout);
        console.log("clear");
        timeout = setTimeout(() => {
            fn(...args);
            console.log("done");
        }, ms);
    }
};