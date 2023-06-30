import React from "react";

function FilterButton(props) {
    let className = "flex-no-shrink p-1 m-2 border-1 rounded border-teal-500 hover:text-white hover:bg-teal-500";
    if (props.name === props.currentFilter) {
        className = className + " text-white bg-teal-500"
    }
    return (
        <button type="button"
                className={className}
                aria-pressed="true"
                onClick={() => props.setFilter(props.name)}>
            <span>{props.name}</span>
        </button>
    );
}

export default FilterButton;