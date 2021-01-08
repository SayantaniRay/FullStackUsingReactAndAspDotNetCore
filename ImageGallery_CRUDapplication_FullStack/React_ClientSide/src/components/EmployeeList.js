
import React ,{useState,useEffect} from 'react';
import Employee from './Employee';
import axios from "axios";


export default function EmployeeList()
{

    const [EmployeeList, setEmployeeList]=useState([])
    const [recordForEdit, setrecordForEdit]=useState(null)

    useEffect(()=>
    {
        refreshEmployeeList();
    },[])


    const employeeAPI=(url='https://localhost:44355/api/Employee')=>{
        return{
            fetchAll : ()=> axios.get(url),
            create:newRecord=>axios.post(url,newRecord),
            update:(id,updateRecord)=>axios.put(url+id, updateRecord),
            delete:id=>axios.delete(url+id)
        }
    }


    
    const refreshEmployeeList=()=>
    {
       employeeAPI().fetchAll()
       .then(res=> setEmployeeList(res.data))
       .catch(err=>console.log(err))  
    }

    const addOrEdit=(formData,onSuccess)=>
    {

        if(formData.get('employeeId')=="0")
       employeeAPI().create(formData)
       .then(res=>
        {
            onSuccess();
            refreshEmployeeList();
        })
        .catch(err=>console.log(err))

        else

        employeeAPI().update(formData.get('employeeId'),formData)
        .then(res=>
         {
             onSuccess();
             refreshEmployeeList();
         })
         .catch(err=>console.log(err))
    }

    const showRecordDetails=data=>
    {
    setrecordForEdit(data)
    
    }

    const onDelete=(e,id)=>
    {
        e.stopPropagation()
    if(window.confirm('Are you Sure to Delete this record?'))
    employeeAPI().delete(id)
    .then(res=>refreshEmployeeList())
    .catch(err=>console.log(err))
    }

const imageCard=data=>
(
    <div className="card" onClick={()=>{showRecordDetails(data)}}>
        <img src ={data.imageSrc} className="card-img-top rounded-circle"/>
        <div className="card-body">
            <h5>{data.employeeName}</h5>
            <span>{data.occupation}</span><br/>
            <button className="btn btn-light delete-button" onClick={e=> onDelete(e,parseInt(data.employeeId))}>
                <i className="fas fa-trash-alt"></i>
            </button>
        </div>
        </div>
    
)

    return(

        <div className="row">
            <div className="col-md-12">
                

                <div className="jumbotron jumbotron-fluid py-4">
                    <div className="container text-center">

                        <h1 class="display-4">Favourites Personalities Image Gallery</h1>
                    </div>
                
                </div>

            </div>


            <div className="col-md-4">

            
            <Employee 
            addOrEdit={addOrEdit}
            recordForEdit={recordForEdit}
            />
        </div>

        <div className="col-md-8">

            <table>
                <tbody>
                    {[...Array(Math.ceil(EmployeeList.length/3))].map((e,i)=>
                    
                        <tr key={i}>
                        <td> {imageCard(EmployeeList[3*i])}</td>
                        <td>{EmployeeList[3*i +1] ? imageCard(EmployeeList[3*i + 1]):null}</td>  
                        <td>{EmployeeList[3*i +2] ? imageCard(EmployeeList[3*i + 2]):null}</td>  
                       
                        
                        
                        
                    </tr>
                    )
                    }
                </tbody>
            </table>
        </div>

        </div>
    )
    
}