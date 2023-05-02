import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './Schedule.module.css';
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import axios from 'axios'
// import 'react-datepicker/dist/react-datepicker.css';
const Schedule = () => {
    const [date, setDate] = useState(new Date());
    const [post, setPost] = useState([]);
    useEffect(() => {
        axios.get("https://mockmeet.onrender.com/api/interviewers")
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
    return (
        <div>
            <center>
                <h3 className={styles.text}>Schedule Full-Stack Interview</h3>
                {/* <div class="w-full max-w-sm">
                    <input type="text" placeholder="Enter your email" className='dropdown input' />
                </div> */}
                <div className={styles.dropdown_input}><br />
                    <select>
                        <option value="">Select an interviewer</option>
                        <option value="option1">Sravya</option>
                        <option value="option2">Yashwant</option>
                        <option value="option3">Sameera</option>
                        <option value="option4">Ali</option>
                        <option value="option5">Varshith</option>
                    </select>
                </div><br />
                <div>
                    <Calendar onChange={onChange} value={date} />
                </div>
                <p className='styles.text1'>Avaliable Times</p><br />
                <div>
                    <button className={styles.button}>10:00</button> &nbsp;&nbsp;&nbsp;
                    <button className={styles.button}>12:00</button><br /><br />
                </div>
                <button className={styles.button}>14:00</button> &nbsp;&nbsp;&nbsp;
                <button className={styles.button}>18:00</button><br /><br />
                <button className={styles.button1}>Book Interview Slot</button>
            </center>
        </div>
    );
};
export default Schedule;