import moment from "moment";


export const getAge = (dateString: string) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export const getDate = (date: string) => {
    const today = new Date(date);

    return moment(today).subtract(10, 'days').calendar();
}

