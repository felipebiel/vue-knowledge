export const truncateString = (str: string, num: number): string => {
    if (str.length <= num) {
        return str;
    }
    return str.slice(0, num) + '...';
};

export const getKeysAndValues = (obj: Record<string, number>): { keys: string[]; values: number[] } => {
    const keys = Object.keys(obj);
    const values = Object.values(obj);
    return { keys, values };
};
