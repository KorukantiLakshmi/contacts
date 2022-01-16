import React,{useCallback} from 'react';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-material-ui';
import FormLabel from "@mui/material/FormLabel";
import { FormControlLabel, Radio } from '@mui/material';
import { RadioGroup } from 'formik-material-ui';
import * as Yup from "yup";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { v4 as uuidv4 } from 'uuid';

const formValidation = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    contact_number: Yup.string().required('Required'),
    gender: Yup.string().required('Required'),
    type: Yup.string().required('Required')
})

const AddContact = (props) => {
    const handleClose = props?.handleClose;
    const setContactList = props?.setContactList;

    const onAdd = useCallback((payload) => {
        payload = {id: uuidv4(), ...payload}
        setContactList((prevState) =>[payload, ...prevState])
        handleClose()
      }, [handleClose,setContactList])

    return (
        <div>
            <DialogTitle>Add New Contact</DialogTitle>
            <Formik initialValues={{first_name: "", last_name: "", email: "", type: "", gender: "", contact_number: "" }} validateOnChange={true}
                validationSchema={formValidation} onSubmit={onAdd}>
                {({ isSubmitting, isValid, resetForm }) => (<>
                    <Form>
                        <DialogContent>
                            <div className="d-flex">
                                <div className='form-field'>
                                    <Field
                                        name="first_name"
                                        type={'text'}
                                        component={TextField}
                                        variant={'outlined'}
                                        color={'primary'}
                                        inputProps={{ maxLength: 100 }}
                                        placeholder={'Enter First Name'}
                                        label="First Name"
                                    />
                                </div>
                                <div className='form-field'>
                                    <Field
                                        name="last_name"
                                        type={'text'}
                                        component={TextField}
                                        variant={'outlined'}
                                        color={'primary'}
                                        inputProps={{ maxLength: 100 }}
                                        placeholder={'Enter Last Name'}
                                        label="Last Name"
                                    />
                                </div>
                            </div>
                            <div className="d-flex">
                                <div className='form-field'>
                                    <Field
                                        name="email"
                                        type={'email'}
                                        component={TextField}
                                        variant={'outlined'}
                                        color={'primary'}
                                        inputProps={{ maxLength: 100 }}
                                        placeholder={'Enter Email'}
                                        label="Email"
                                    />
                                </div>
                                <div className='form-field'>
                                    <Field
                                        name="contact_number"
                                        type={'number'}
                                        component={TextField}
                                        variant={'outlined'}
                                        color={'primary'}
                                        inputProps={{ maxLength: 10 }}
                                        placeholder={'Enter Phone Number'}
                                        label="Contact Number"
                                    />
                                </div>
                            </div>
                            <div>
                                <FormLabel className={'form-label'}>{('Gender')}*</FormLabel>
                                <div className={"d-flex form-label"}>
                                    <div>
                                        <Field component={RadioGroup} name="gender">
                                            <div className="d-flex ">
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio disabled={isSubmitting} />}
                                                    label={("Male")}
                                                    name="gender"
                                                    disabled={isSubmitting}
                                                />
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio disabled={isSubmitting} />}
                                                    label={("Female")}
                                                    name="gender"
                                                    disabled={isSubmitting}
                                                />

                                            </div>
                                        </Field>
                                    </div>
                                </div>
                                <FormLabel className={'form-label'}>{('Type Of Contact')}*</FormLabel>
                                <div className={"d-flex form-label"}>
                                    <div>
                                        <Field component={RadioGroup} name="type" >
                                            <div className="d-flex ">
                                                <FormControlLabel
                                                    value="personal"
                                                    control={<Radio disabled={isSubmitting} />}
                                                    label={("Personal")}
                                                    name="type"
                                                    disabled={isSubmitting}
                                                />
                                                <FormControlLabel
                                                    value="business"
                                                    control={<Radio disabled={isSubmitting} />}
                                                    label={("Business")}
                                                    name="type"
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                        </Field>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type={"submit"} className={"submit"} disabled={isSubmitting || !isValid} variant={"contained"} color="primary" autoFocus>Add</Button>
                        </DialogActions>
                    </Form>
                </>)}
            </Formik>
        </div>
    );
};

export default AddContact;
