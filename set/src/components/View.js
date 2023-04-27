import React from 'react'




export const View = ({details, deleteDetails, search, editDetails}) => {
 return  (details.filter((detail)=>detail.name.toLowerCase().includes(search)).map(detail=>(
        <tr key={detail.id}>
            <td>{detail.name}</td>
            <td>{detail.id}</td>
            <td>{detail.race}</td>
            <td>{detail.age}</td>
            <td>{detail.password}</td>
            <td>{<button className="btn btn-secondary"onClick={()=>editDetails(detail.id)}>Edit</button>}</td>
            <td>{<button className="btn btn-danger"onClick={()=>deleteDetails(detail.id)}>Delete</button>}</td>
            
        </tr>)
    ))
  
  
  
  
}
