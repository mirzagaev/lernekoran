import { differenceInYears, parse } from "date-fns";

function CalculateAge({ birthdate }) {
    let dateSpl = birthdate.split("-");
    let changedFormat = dateSpl[2]+"/"+dateSpl[1]+"/"+dateSpl[0];
    let date = parse(changedFormat, "dd/MM/yyyy", new Date());
    let age = differenceInYears(new Date(), date);
    return age;
}

export default CalculateAge;