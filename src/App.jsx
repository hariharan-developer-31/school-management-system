import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import { Button, Container, Modal } from 'react-bootstrap';
import ModalPopUp from "./Modal.jsx"

export default function Crud() {
  
  let [tableData, setTableData] = useState(null);
  let [tempData, setTempData] = useState({});
  let [update,setUpdate] = useState(true);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {setShow(true);
  setTempData(data);
}

useEffect(()=>{
    fetch('https://67723b62ee76b92dd4918073.mockapi.io/user/user_data', {
      method: 'GET',
      headers: {'content-type':'application/json'},
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      
    }).then(tasks => {
      setTableData(tasks);
    }).catch(error => {
      console.log(error);
    })
  },[update])

  let handleDelete = (id)=>{
    // alert(id);
    fetch(`https://67723b62ee76b92dd4918073.mockapi.io/user/user_data/${id}`, {
      method: 'DELETE',
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(task => {
      // Do something with deleted task
      alert("deleted");
      setUpdate(!update);
    }).catch(error => {
      // handle error
    })

  }


  console.log(tableData);

  return(
  <>
  <Container fluid className='p-1 text-center'>
    <Table striped bordered hover variant='dark'>
      <thead>

        <tr className='fs-5'>
          <th>S.No</th>
          <th>Name</th>
          <th>Email-Id</th>
          <th>Location</th>
          <th>Phone No</th>
          <th>Qualification</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody className='fs-5 text-center'>
        {tableData && tableData.map((a,i)=>(
          <tr key={i+1}>
          <td className='p-3'>{i+1}</td>
          <td className='p-3'>{a.name}</td>
          <td className='p-3'>{a.emailId}</td>
          <td className='p-3'>{a.loaction}</td>
          <td className='p-3'>{a.phoneNo}</td>
          <td className='p-3'>{a.qualification}</td>
          <td> 
            <Button onClick={()=>handleShow(a)} className='m-1'>Edit</Button> 
            <Button className='m-1' variant='danger' onClick={()=>handleDelete(a.id)} >Delete</Button> 
          </td>
        </tr>
        ))}

      
      

        {/* <tr>
          <td className='p-3'>1</td>
          <td className='p-3'>Mark</td>
          <td className='p-3'>Otto</td>
          <td className='p-3'>@mdo</td>
          <td className='p-3'>Otto</td>
          <td className='p-3'>@mdo</td>
        </tr>

        <tr>
          <td className='p-3'>2</td>
          <td className='p-3'>Jacob</td>
          <td className='p-3'>Thornton</td>
          <td className='p-3'>@fat</td>
          <td className='p-3'>Thornton</td>
          <td className='p-3'>@fat</td>
        </tr> */}

      </tbody>
    </Table>
  </Container> 
  <ModalPopUp modify={update} setModify={setUpdate} status={show} close={handleClose} cellData={tempData} updateData={setTempData}/>
  </>   
  )
}
