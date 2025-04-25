import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { baseUrl } from '../../features/Api/BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
export default function Addcourse() {
    const [data, setData] = useState({
        Heading: '',
        Description: '',
        Detailed_description: '',
        image: null,
        price: ''
    });
const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setData({ ...data, Detailed_description: data });
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData({ ...data, image: file });
    };
    const handleClickPost = () => {
        const formData = new FormData();
        formData.append("Heading", data.Heading);
        formData.append("Description", data.Description);
        formData.append("Detailed_description", data.Detailed_description);
        formData.append("price", data.price);
        if (data.image) { 
            formData.append("image", data.image);
        }
        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }
        axios
            .post(`${baseUrl}cms_online_courses`, formData, {
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("token")}`,
                   
                },
              })
            .then((response) => {
                toast.success(response.data.message);
                setTimeout(()=>{
                    navigate('/Admin/Onlinecourse')
                },[1500])
            })
            .catch((error) => {
                toast.error(error.response?.data?.message || "An error occurred");
            });
    };
    return (
        <div className="d-flex flex-column">
           <ArrowBack className="mb-3" style={{cursor:"pointer"}} onClick={()=>{navigate('/Admin/Onlinecourse')}} />
            <TextField
                style={{ width: "100%" }}
                onChange={handleChange}
                name="Heading"
                label="Heading"
                variant="outlined"
                size="small"
            />
            <TextField
                className="mt-3"
                style={{ width: "100%" }}
                onChange={handleChange}
                name="Description"
                label="Description"
                variant="outlined"
                size="small"
            />
            <div className="mt-3" style={{ width: "100%" }}>
                <CKEditor
                    editor={ClassicEditor}
                    data={data.Detailed_description}
                    onChange={handleEditorChange}
                    config={{
                        height: '400px', // Set the height here
                    }}
                />
            </div>
            <TextField
                className="mt-3"
                type="file"
                name="image"
                onChange={handleFileChange}
                label="Image"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                size="small"
            />
            <TextField
                className="mt-3"
                name="price"
                onChange={handleChange}
                label="Price"
                variant="outlined"
                size="small"
            />

            <div className="d-flex justify-content-between">
                <Button
                    style={{ backgroundColor: "#5c6bc0", color: "white" }}
                    className="mt-4"
                    onClick={handleClickPost}
                >
                    Submit
                </Button>
            </div>
            <ToastContainer />
        </div>
    );
}
