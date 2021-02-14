import React from "react";
//import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'https://some-domain.com/api/',
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' }
// });

const TodosMaster = (props) => {

    const { todos } = props;
    return <div>{todos}</div>;
}

export default TodosMaster;