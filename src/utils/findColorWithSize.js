export function findColorWithSize(colors) {
    for (let i = 0; i < colors.length; i++) {
        if (colors[i]["sizes"].length > 0) {
            return colors[i]["id"];
        }
    }
    return -1;
}