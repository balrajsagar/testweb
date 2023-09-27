import moment from "moment";

export default function convertPSTtoLocalTime(time){
    if(!time){
        return null;
    }
    //local time zone (system timezone)
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    // console.log(timeZone);
    const psttime = time && time.concat("-8:00");
    const convertLocalTZ = (date, timeZone) => {
        return new Date((date).toLocaleString( "en-US",{ timeZone: timeZone })).toUTCString();
    }
    const localtime = time && convertLocalTZ(new Date(psttime), timeZone);
    return moment(localtime).format("MM-DD-YYYY hh:mm:ss a");
}