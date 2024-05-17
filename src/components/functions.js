function getTimeDifference(startDate, endDate) {
    // Ensure the input dates are valid Date objects
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
        throw new Error("Both arguments must be Date objects");
    }

    // Calculate the difference in milliseconds
    const diffMs = endDate - startDate;

    // Ensure the difference is positive
    if (diffMs < 0) {
        throw new Error("endDate must be later than startDate");
    }

    // Calculate the difference in hours and minutes
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // Return the formatted result
    if(diffHours>0){
        return `${diffHours}h ${diffMinutes}min`;
    }else{
        return `${diffMinutes}min`;
    }
}

export default getTimeDifference 
