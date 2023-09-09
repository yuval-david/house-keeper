// Function to format date
import moment from 'moment';

export const getDate = (date: string) => {
    if (date) {
        const dateObject = new Date(date);
        return moment(dateObject).format('DD.MM.YYYY');
    }
}