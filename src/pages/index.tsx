
import {Divider, Comment, Input, List, Form, Button, Avatar, Tooltip } from 'antd'
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import React, {createElement, useState,useEffect} from 'react'
import axios from 'axios'
import moment from 'moment';
import 'moment/locale/zh-cn';
import './index.css'

const { TextArea } = Input;

export default ()=>{
  const fakeData = [   
    {
      userid:'1',
      username:'Amy',
      content:'There is question!',
      time:'2019-3-21',
      likes:0,
      dislike:0
    },
    {
      userid:'1',
      username:'james',
      content:'how are you?',
      time:'2019-3-21'
    },{
      userid:'1',
      username:'Amy',
      content:'There is question!',
      time:'2019-3-21'
    },
    {
      userid:'1',
      username:'james',
      content:'how are you?',
      time:'2019-3-21'
    },{
      userid:'1',
      username:'Amy',
      content:'There is question!',
      time:'2019-3-21'
    },
    {
      userid:'1',
      username:'james',
      content:'how are you?',
      time:'2019-3-21'
    },{
      userid:'1',
      username:'Amy',
      content:'There is question!',
      time:'2019-3-21'
    },
    {
      userid:'1',
      username:'james',
      content:'how are you?',
      time:'2019-3-21'
    },{
      userid:'1',
      username:'Amy',
      content:'There is question!',
      time:'2019-3-21'
    },
  ]

  const [data,setdata] = useState([])
  const [comment,setcomment] = useState('')
  const [submitting,setsubmitting] = useState(false)
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  moment.locale('EN_UK');

  useEffect(()=>{
    axios.get('/api/getdata').then(res => {  
    setdata(res.data)
  }).catch(err=>{
    console.log('err',err)
  })
  },[])

  const dataSource = fakeData.map(item=>{  
    return {
      username:item.username,
      content:<p>{item.content}</p>,
      time:<span style={{paddingLeft:30}}>{item.time}</span>
    }
  })

   const  handleChange = e => {
    setcomment(e.target.value)
  }

  const onSubmit = ()=>{  
    let data = {
      username:'Lin',  
      time:new Date(),
      content:comment
    }
    setsubmitting(true)
    axios({
      method: 'post',
      url: '/api/postdata',
      data: data
    }).then(res => {  
      setsubmitting(false) 
      setdata(res.data)
    }).catch(err=>{
      setsubmitting(false)
      console.log('err',err)
    })
  }

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };
  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (<div className="chart-wrap" style={{ 
    backgroundImage: `url("https://images.unsplash.com/photo-1615980251529-f31d82558bf1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80")` 
  }}>
  <Divider className="title" orientation="center">Computer science</Divider>
  <List
    bordered = {true}
    className="comment-list"
    itemLayout="horizontal"
    dataSource={dataSource}
    renderItem={item => (
      <li>
        <Comment
          actions={actions}
          content={item.content}
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span className="dateTime">{moment().fromNow()}</span>
            </Tooltip>
          }
        />
      </li>
    )}
  />
  <div>
  <Form.Item>
      <TextArea rows={2} onChange={handleChange} value={comment}/>
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" >
        Submit
      </Button>
    </Form.Item>
  </div>
</div>)
}
