import React from "react";

export function Checkbox ({ id, type, name, handleClick, isChecked }){
	return (
		<input
			id={id}
			name={name}
			type={type}
			onChange={handleClick}
			checked={isChecked}
		/>
	);
}
