import moment from "moment";

let dates = [];
let start = 0;
let end = 0;
let id = 0;
for (let i = 0; i < 10; i++) {
    start = moment().startOf('day').add(i, "days").add(8, "hours").toDate();
    end = moment().startOf('day').add(i, "days").add(8+4, "hours").toDate();
    dates.push({
        'id' : id,
        'title': 'Half Day 1',
        'start': start,
        'end': end
    });
    id++;
    start = moment().startOf('day').add(i, "days").add(13, "hours").toDate();
    end = moment().startOf('day').add(i, "days").add(13+4, "hours").toDate();
    dates.push({
        'id' : id,
        'title': 'Half Day 2',
        'start': start,
        'end': end
    });
    id++
}

export default dates