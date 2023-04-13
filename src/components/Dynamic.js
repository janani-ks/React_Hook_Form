import React from "react";
import "./dynamic.css"
const Dynamic =(props)=>{
    const handleClick=()=>{
        props.setDatac([...props.datac,{Name:"",Relation_type:""}])
        console.log(props.datac[(props.datac.length)-1].Name);
        if(props.datac[(props.datac.length)-1].Name!=='' && props.datac[(props.datac.length)-1].Relation_type!=='')
        return false; 
    }
    const handleChange=(e,i)=>{
        const {name,value}=e.target
        const onchangeVal = [...props.datac]
        onchangeVal[i][name]=value
        props.setDatac(onchangeVal)
    }
    const handleDelete=(i)=>{
        const deleteVal = [...props.datac]
        deleteVal.splice(i,1)
        props.setDatac(deleteVal)
    }
    return(
        <div>
            <button className="dyn"  onClick={handleClick}>Add</button>
              {props.datac.map((val,i)=>
                <div>
                    <input  className="dyn_input" placeholder="Enter the relation name" name="Name" value={val.fname} onChange={(e)=>handleChange(e,i)} required/>
                    <input  className="dyn_input" placeholder="Enter the relation type" name="Relation_type" value={val.lname} onChange={(e)=>handleChange(e,i)} required/> 
                    {props.datac.length > 1 && (<button className="del_dyn" onClick={()=>handleDelete(i)}>Delete</button >)}
                </div>
                )
    }
    <div className="invalid_relation">{props.errorMessages}</div>
        </div>
    )
}

export default Dynamic;