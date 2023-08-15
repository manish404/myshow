const generateSeatNames = (hallId, showID, rows, columns) => {
    const seatNames = [];

    for (let row = 1; row <= rows; row++) {
        for (let column = 1; column <= columns; column++) {
            const seatName = `s-${row}_${column}`;
            seatNames.push(seatName);
        }
    }

    return seatNames;
};

export default generateSeatNames;