// TODO: Review - is this mathematically correct?
export const randomizeSuccess = (currentOdds) => {
    const random = Math.random() * 100;
    return random <= currentOdds;
};
