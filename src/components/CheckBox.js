import { useState } from "react";
import "./dynamic.css"
let CheckBox=(props)=>{
    const handleClick=(id)=>{
        props.setcheckbox((prev)=>{
            return  prev.map((item)=>{
                if(item.id === id){
                    return {...item, check:!item.check};
                }
                else{
                    return{...item};
                }
            })
        })
        var c = 0;
        props.checkbox.forEach(myfunction);
        function myfunction(item) {
            if (item.check !== true){
                c++;
            }
        }
        if(c===props.checkbox.length){
            props.clearErrors('Interest')
        }
            // props.trigger('Interest')
}
    return(
        <div className="field">
                <label >
                    Languages known
                    <div>
                    {props.checkbox.map((item) => (
                    <div className ="flex" key={item.id} >
                        <input type="checkbox" onClick={()=>handleClick(item.id)} className="box" id={item.id}/>
                        <label className="check"> {item.name} </label>
                    </div>
                    ))
                }
                </div>
                </label>
                <div className="invalid_box">{props.errorMessages}</div>
        </div>
    )
}
export default CheckBox;