import React from 'react'

export default function Alert(props) {
  
    // this fucntion is used to capitalize the first word of alerttype
    const capitalize=(word)=>{
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }

  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
      <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg} 
    </div>
  );
}
