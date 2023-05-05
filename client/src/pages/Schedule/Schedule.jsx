import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './Schedule.module.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Schedule = () => {
    const [post, setPost] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);

    const availableDates = [
        new Date("2021-01-01"),
        new Date("2022-02-05"),
        new Date("2023-03-10"),
        new Date("2022-01-15"),
        new Date("2023-04-20")
    ];
    useEffect(() => {
        axios.get("https://mockmeet.onrender.com/api/mocks")
            .then(async (res) => {
                let result = await res.data;
                // let final=result.json();
                console.log(result);
                setPost(result);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])
    // const postList = post.length ? (post.map((item) => {
    //     return (
    //         <select>
    //             <option>{item.name}</option>
    //         </select>
    //     )
    // })
    // ) : (<p>No data</p>)
    const onChange = date => {
        setDate(date);
    }
    function handleClick() {
        alert('Booked Successfully');
      }
    return (
        <div>
            <center>
                <h3 className={styles.text}>Schedule Full-Stack Interview</h3>
                {/* <div class="w-full max-w-sm">
                    <input type="text" placeholder="Enter your email" className='dropdown input' />
                </div> */}
                <div className={styles.dropdown_input}><br />
                    <select>
                        {post.map(item => (
                            // <option key={item.id} value={item.id}>{item.interviewers.name}</option>
                            // item.title === 'Full-Stack Interview' ? (
                            // <select>
                            // <option>
                            
                                item.interviewers.map((interviewer,i) => (
                                    <option value={interviewer._id} key={i}>
                                        {interviewer.name}
                                    </option>
                                ))
                            
                            // </option>
                            // </select>
                            //   ) : (
                            //     <option key={item.id} value={item.id}>{item.title}</option>
                            //   )
                        ))}
                    </select>
                </div><br />
                <div>
                    {/* <Calendar onChange={onChange} value={date} /> */}
                    <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        includeDates={availableDates}
                        inline
                    />
                </div>
                <p className='styles.text1'>Avaliable Times</p><br />
                <div>
                    <button className={styles.button}>10:00</button> &nbsp;&nbsp;&nbsp;
                    <button className={styles.button}>12:00</button><br /><br />
                </div>
                <button className={styles.button}>14:00</button> &nbsp;&nbsp;&nbsp;
                <button className={styles.button}>18:00</button><br /><br />
                <button className={styles.button1} onClick={handleClick}>Book Interview Slot</button>
            </center>
        </div>
    );
};
export default Schedule;