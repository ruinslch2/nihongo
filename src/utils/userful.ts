export function getRandomObject<T>(data: T[], size: number) {
    if (data.length < size) {
        throw new Error(`輸入的數字必須大於或等於${size}`);
    }
    const obj: T[] = [];
    while (obj.length < size) {
        const randomNumber = Math.floor(Math.random() * (data.length));
        if (!obj.includes(data[randomNumber])) {
            obj.push(data[randomNumber]);
        }
    }
    return obj;
}