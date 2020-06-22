import React, { Component } from "react";
import "./search-panel.css";

export default class CustomInput extends Component {
    state = {
        text: '',
    } 
    onSearch2 = (eve) => {
        
        const inpValue = eve.target.value;
        this.setState({ inpValue });
        this.props.onSearch(inpValue);
        
    };
    render() {
        const searchText = "Type here to search";
        return (
            <input
                placeholder={searchText}
                className="form-control media search-input"
                onChange={ this.onSearch2 }
            />
        );
    }
}
