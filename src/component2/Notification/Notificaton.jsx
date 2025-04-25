import React, { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { baseUrl } from '../../features/Api/BaseUrl';

export default function Notification() {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        empId: "",
        super_adminChoice: "",
    });

    const [showUserDropdown, setShowUserDropdown] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        if (name === 'super_adminChoice') {
            setShowUserDropdown(value === "1");
        }
    };

    const handleSubmit = async () => {
        const userid = localStorage.getItem('id');
        const postdata = {
            title: formData.title,
            message: formData.message,
            empId: formData.empId,
            super_adminChoice: parseInt(formData.super_adminChoice),
        };
        try {
            const response = await axios.post(`${baseUrl}send_notification/${userid}`, postdata, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",

                },
            });
            toast.success(response.data.message);
            setFormData({
                title: "",
                message: "",
                empId: "",
                super_adminChoice: "",
            });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axios.get(`${baseUrl}getAllEmp`);
                setData(response.data.Details);
            } catch (error) {
                toast.error(error.response.data.message);
            }
        };
        getUser();
    }, []);

    return (
        <div className="content">
            <div className="row">
                <div className="col-md-12">
                    <h4 className="page-title">Notification</h4>
                </div>
            </div>
            <div className="container main_container">
                <FormControl className='mb-3' sx={{ width: '100%' }}>
                    <InputLabel id="type-dropdown-label11">Select Notification Type</InputLabel>
                    <Select
                        labelId="type-dropdown-label11"
                        label="Select Notification Type"
                        id="type-dropdown"
                        value={formData.super_adminChoice}
                        onChange={handleInputChange}
                        name='super_adminChoice'
                    >
                        <MenuItem value="">
                            <em>Select</em>
                        </MenuItem>
                        <MenuItem value="1">Particular Client</MenuItem>
                        <MenuItem value="2">Client</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    fullWidth
                    className="w-100 mb-3"
                    label="Title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={formData.title}
                    onChange={handleInputChange}
                    size="normal"
                />
                <TextField
                    fullWidth
                    className="w-100 mb-3"
                    label="Message"
                    name="message"
                    type="text"
                    autoComplete="off"
                    value={formData.message}
                    onChange={handleInputChange}
                    size="normal"
                />
                {showUserDropdown && (
                    <FormControl sx={{ width: '100%' }}>
                        <InputLabel id="user-dropdown-label12">Select User</InputLabel>
                        <Select
                            labelId="user-dropdown-label12"
                            id="user-dropdown"
                            label="Select User"
                            value={formData.empId}
                            onChange={handleInputChange}
                            name='empId'
                        >
                            <MenuItem value="">
                                <em>Select</em>
                            </MenuItem>
                            {data && data.length > 0 && data.map((item) => (
                                <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
                <Button className='global_button123 mt-4' onClick={handleSubmit}>
                    Post Notification
                </Button>
                <ToastContainer />
            </div>
        </div>
    );
}
