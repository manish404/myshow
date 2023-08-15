export function capitalize(string) {
    if (!string) return;
    return string
        .split(' ')
        .map(word => {
            const [firstChar, ...remChars] = word;
            return [firstChar.toUpperCase(), ...remChars].join('');
        })
        .join(' ');
}