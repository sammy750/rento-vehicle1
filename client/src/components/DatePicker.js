import { addDays, minDate, disabledDates } from 'date-fns';
import { useState, react ,useEffect } from 'react';
import { DateRangePicker } from 'react-date-range';
import moment from 'moment';
import axios from "axios";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file


// const disable = async () => {
//     await axios(`http://localhost:8080/stored`).then(res => console.log(res.data));

//     return (
//         <>
//         <DateRangePicker disabledDates={[new Date(2022, 1, 22)]}/>

//         </>

//     )
// }





const DatePicker = ({ setDate, date }) => {
        const[disable , setDisable] =useState([])
        const[bookedDates , setBookedDates]=useState([])
      const [result , setResult] =useState("")
useEffect(() => {
    axios(`http://localhost:8080/stored`).then(res => {
        // console.log(res.data)
        setResult(old => [...old , res.data])
})
}, [])
    
console.log(date)

useEffect(()=>{
setBookedDates(result[0]?.map((mainObj) => mainObj.date))
let disableDates = bookedDates?.reduce((acc, curr) => {
    acc.push(curr.startDate)
    acc.push(curr.endDate)
    return acc
  },[])

  setDisable(disableDates)
},[result])




    return (

        <>

            <DateRangePicker

                onChange={item => setDate([item.selection])}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={date}
                direction="horizontal"
                minDate={moment().toDate()}
                //  disabledDates={item => date([item.selection])}
                //  disabled={true}
                disabledDates={[new Date(2022, 1, 15)]}
                disabeleDates={disable}
            />;

        </>
    )

}

export default DatePicker;



