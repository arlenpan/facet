// TODO: Review - is this mathematically correct? do we have any one-off errors
export const randomizeSuccess = (currentOdds) => {
    const random = Math.random() * 100;
    return random <= currentOdds;
};

// ?????????
export const calculateProbability = (slots) => {
    
}
