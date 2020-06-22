import React, {Component} from "react";
import './app-header.css'


export default class CustomH1 extends Component{
    
    render() {
        
        const { toDo = 2, done = 5 } = this.props
        return (
            <div className="app-header d-flex">
                <h1 className='centralize'>Todo List</h1>
                <h2>
                    {toDo} more to do, {done} done
            </h2>
            </div>
        );    
    }
    
};

