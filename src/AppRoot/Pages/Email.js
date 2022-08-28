

import 'antd/dist/antd.css';
import '../../App.css';
import { Card,Input ,Space,Comment ,Avatar} from 'antd';
import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
const { TextArea } = Input;

export const Email = () => {

  const Mask=useRef(null);
  const [message,AlterMessage]=useState({SendingUser:"",Message:""})
  const handleClick =()=>{

    Mask.current.style.border="thin solid green";

  }


  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_bapfn8e', 'template_9y1ggib',form.current, 'y7vCDJJgEwr7K2txV')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
     // e.target.reset();
  };

  return (
    <Space direction='horizontal' wrap >
    <Card title="Typing Mask" bordered={false} style={{ width: 300 }} ref={Mask}>
    <form ref={form} onSubmit={sendEmail} className="MainPageWrapper">
      <label>Name</label>
      <input type="text" name="userName" onChange={e=>{AlterMessage({...message,SendingUser:e.target.value})}}/>
      <label>Message</label>
      <textarea name="message" onChange={e=>{AlterMessage({...message,Message:e.target.value})}}/>
      <input type="submit" value="Send" onClick={handleClick} />
    </form>
  </Card>

 
  <Comment 
      author={message.SendingUser}
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
      content={
        message.Message
      }

    />
  

    </Space>
  );
};