import React, { Component } from "react";
import "./item-status-filter.css";


export default class Item_status_filter extends Component {
    state = {
        status: "",
    };
    
    buttons = [
        { name: "all", label: "All" },
        { name: "active", label: "Active" },

        { name: "done", label: "Done" },
        { name: "important", label: "Important" },
    ];
    filtered = (e) => {
        const value = e.target.value;
        this.setState({ status: value });
        this.props.onFilter(value);
    };
    
    render() {
        
        // const {onFilter} = this.props
        const { filter } = this.props;
        const buttons = this.buttons.map(({ name, label }) => {
            const isActive = name === filter;
            const clazz = isActive ? "btn-info b" : "btn-outline-secondary";
            const bb = "bb" ? name === "important" : "";
            return (
                <button
                    type="button"
                    value={name}
                    className={`btn ${clazz} ${bb} myBtn`}
                    onClick={this.filtered}
                    key={name}
                >
                    {label}
                </button>
                
            );
        });

        return <div className="btn-group g">{buttons}</div>;
    }
}

// const Item_status_filter = () => {
// return (
//     <div className="btn-group">
//         <button type="button" className="btn btn-info">All</button>
//         <button type="button" className="btn btn-outline-secondary">Active</button>
//         <button type="button" className="btn btn-outline-secondary">Done</button>
//     </div>
// );
// };

// export default Item_status_filter;
