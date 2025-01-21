import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Model(xyz) {  
  let {name, emailId, loaction, phoneNo, qualification} = xyz.cellData;

  let saveChanges = ()=>{
    fetch(`https://67723b62ee76b92dd4918073.mockapi.io/user/user_data/${xyz.cellData.id}`, {
      method: 'PUT', // or PATCH
      headers: {'content-type':'application/json'},
      body: JSON.stringify(xyz.cellData)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
      // handle error
    }).then(task => {
      // Do something with updated task
      // alert("updated");
      xyz.setModify(!xyz.modify);
    }).catch(error => {
      // handle error
    })
    xyz.close();
  }


  console.log(xyz.cellData);
  return (
    <>
      <Modal show={xyz.status} onHide={xyz.close}>

        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={name}
                onChange={(e)=>xyz.updateData({...xyz.cellData, name: e.target.value})}
                // placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>Email ID</Form.Label>
              <Form.Control
                type="text"
                name="emailID"
                defaultValue={emailId}
                onChange={(e)=>xyz.updateData({...xyz.cellData, emailId: e.target.value})}
                // placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                defaultValue={loaction}
                onChange={(e)=>xyz.updateData({...xyz.cellData, loaction: e.target.value})}
                // placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>Phone No</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNo"
                defaultValue={phoneNo}
                onChange={(e)=>xyz.updateData({...xyz.cellData, phoneNo: e.target.value})}
                // placeholder="name@example.com"
                autoFocus
              />
              <Form.Label>Qualification</Form.Label>
              <Form.Control
                type="text"
                name="qualification"
                defaultValue={qualification}
                onChange={(e)=>xyz.updateData({...xyz.cellData, qualification: e.target.value})}
                // placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={xyz.close}>
            Close
          </Button>
          <Button variant="primary" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Model;