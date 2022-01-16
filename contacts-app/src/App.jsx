import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AddContact from "./addContact/AddContactComponent";
import data from "./data.json";
import ContactsListComponent from './contacts/ContactsListComponent';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import EditContactComponent from './editContact/EditContactComponent';

function App() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [contactType, setContactType] = useState("all");
  const [detailsList, setDetailsList] = useState([])
  const [contactList, setContactList] = useState([...data])
  const [genderFilter, setGenderFilter] = useState("all");
  const [editContact, setEditContact] = useState(null);
  const [search,setSearch] = useState("");

  const handleChange = (event, newValue) => {
    setContactType(newValue);
    setGenderFilter("all")
    setSearch("")
  };

  const handleClickOpen = () => {
    setOpenAdd(true);
  };

  const handleEditOpen = (id) => {
    let temp = contactList?.filter((item) => item?.id === id)
    setEditContact(temp[0])
    setOpenEdit(true)
  }

  const handleCloseAdd = useCallback(() => {
    setOpenAdd(false);
  }, [])

  const handleCloseEdit = useCallback(() => {
    setOpenEdit(false);
  }, [])

  useEffect(() => {
    let array = contactType !== "all" ? contactList.filter((item) => item?.type === contactType) : contactList;
    setDetailsList([...array])
  }, [contactType, contactList])

  const handleDelete = useCallback((id) => {
    let array = contactList.filter((item) => item?.id !== id)
    setContactList([...array])
  }, [contactList])

  const handleFilterChange = useCallback((event) => {
    let array = []
    setSearch("")
    if (event?.target?.value !== "all") {
      if (contactType === "all") {
        array = contactList?.filter((item) => item?.gender === event?.target?.value)
      } else {
        array = contactList?.filter((item) => item?.gender === event?.target?.value && item?.type === contactType)
      }
    } else {
      if (contactType === "all") {
        array = contactList
      }else{
      array = contactList?.filter((item) => item?.type === contactType)
      }
    }

    setDetailsList(array)
    setGenderFilter(event?.target.value)
  }, [contactList, contactType])

  const handleSearchChange = (event) =>{
    setSearch(event?.target?.value)
    if(event.target.value !== ""){
    let temp=  detailsList.filter(obj => Object.keys(obj).some(key => obj[key].includes(event?.target.value)));
    setDetailsList(temp)
    }else{
      let array = contactType !== "all" ? contactList.filter((item) => item?.type === contactType) : contactList;
      setDetailsList([...array])
    }
  }

  useEffect(()=>{
   
  },[search,contactList])
  console.log(search)


  return (
    <div className="App">
      <h1>Contacts List</h1>
      <div className='d-flex'>
        <input type="text" value={search} onChange={handleSearchChange} placeholder='Enter the search'/>
      <Button variant="outlined" onClick={handleClickOpen} >Add New</Button>
      </div>
      <div className='gender-wrapper'>
        <FormControl component="fieldset" >
          <FormLabel component="legend">Gender</FormLabel>
          <RadioGroup aria-label="gender" value={genderFilter} onChange={handleFilterChange}>
            <div className='d-flex'>
            <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="all" control={<Radio />} label="All" />
            </div>
          </RadioGroup>
        </FormControl>
      </div>
      <Dialog open={openAdd} onClose={handleCloseAdd}>
        <AddContact handleClose={handleCloseAdd} setContactList={setContactList} />
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <EditContactComponent handleClose={handleCloseEdit} setContactList={setContactList} contactList={contactList} editContact={editContact} />
      </Dialog>
      <ContactsListComponent detailsList={detailsList}  handleChange={handleChange} handleDelete={handleDelete} handleEditOpen={handleEditOpen} contactType={contactType} />
    </div>
  );
}

export default App;
