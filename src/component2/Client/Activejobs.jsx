// import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom'
// import { baseUrl } from '../../features/Api/BaseUrl'
// export default function Activejobs() {
// const [data,setData]=useState([])
//     const locaitons = useLocation()
//     useEffect(() => {
//         getdata()
//     }, [])
//     const getdata = () => {
//         axios.get(`${baseUrl}activejobs_by_client/${locaitons?.state?.data}`).then((response) => {
//           setData(response.data.activeJob)
//         }).catch((error) => {
//             console.log(error.response.data)
//         })
//     }
//     return (
//         <div>
//             <p className='text-center my-3 fw-bold fs-3' style={{ color: '#2e47cc' }}>Active Jobs</p>
//             <TableContainer component={Paper}>
//                 <Table>
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Job Id</TableCell>
//                             <TableCell>Job Title</TableCell>
//                             <TableCell>Phone Number</TableCell>
//                             <TableCell>Company Name</TableCell>
//                             <TableCell>Client Email</TableCell>
//                             <TableCell>State Date</TableCell>
//                             <TableCell>End Date</TableCell>
//                             <TableCell>Company Location</TableCell>
//                             <TableCell>Number of Female Applicants</TableCell>
//                             <TableCell>Number of Male Applicants</TableCell>
//                             <TableCell>Total number of applicant</TableCell>
//                             <TableCell>Number of Profile mismatch</TableCell>
//                             <TableCell>Number of profile Match</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {data && data.length>0 && data.map((item,index)=>{
//                             return(<>
//                             <TableRow key={index}>
//                             <TableCell>{item.jobId}</TableCell>
//                             <TableCell>{item.job_title}</TableCell>
//                             <TableCell>{item.phone_no}</TableCell>
//                             <TableCell>{item.company_name}</TableCell>
//                             <TableCell>{item.employee_email}</TableCell>
//                             <TableCell>{new Date(item.startDate).toLocaleDateString("en-GB")}</TableCell>
//                             <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
//                             <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
//                             <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
//                             <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
//                             <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
//                             <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
//                             <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
//                         </TableRow>
//                             </>)
//                         })}
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </div>
//     )
// }
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { baseUrl } from '../../features/Api/BaseUrl'
import { ToastContainer, toast } from 'react-toastify'
import { ArrowBack } from '@mui/icons-material'
export default function Activejobs() {
    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(2)
    const locaitons = useLocation()
    const navigate = useNavigate()
    useEffect(() => {
        getdata()
    }, [])
    const getdata = () => {
        axios.get(`${baseUrl}activejobs_by_client/${locaitons?.state?.data}`)
            .then((response) => {
                setData(response.data.activeJob)
            })
            .catch((error) => {
                toast.error(error.response.data.message)
            })
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }
    return (
        <div>
            <ArrowBack className="mb-3" style={{cursor:"pointer"}} onClick={()=>{navigate('/Admin/Clients')}} />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Job Id</TableCell>
                            <TableCell>Job Title</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>Client Email</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Company Location</TableCell>
                            <TableCell>Number of Female Applicants</TableCell>
                            <TableCell>Number of Male Applicants</TableCell>
                            <TableCell>Total Number of Applicants</TableCell>
                            <TableCell>Number of Profile Mismatch</TableCell>
                            <TableCell>Number of Profile Match</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
                            console.log(item)
                            return (
                                <TableRow key={index}>
                                    <TableCell>{item.jobId}</TableCell>
                                    <TableCell>{item.job_title}</TableCell>
                                    <TableCell>{item.phone_no}</TableCell>
                                    <TableCell>{item.company_name}</TableCell>
                                    <TableCell>{item.employee_email}</TableCell>
                                    <TableCell>{new Date(item.startDate).toLocaleDateString("en-GB")}</TableCell>
                                    <TableCell>{new Date(item.endDate).toLocaleDateString("en-GB")}</TableCell>
                                    <TableCell>{item.company_HQ}</TableCell>
                                    <TableCell>{item.femaleCandidateCount}</TableCell>
                                    <TableCell>{item.maleCandidateCount}</TableCell>
                                    <TableCell>{item.AllCandidateCount}</TableCell>
                                    <TableCell>{item.mismatchedProfileCount}</TableCell>
                                    <TableCell>{item.matchedProfileCount}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                {/* <TablePagination
                    rowsPerPageOptions={[2, 5, 10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                /> */}
            </TableContainer>
            <ToastContainer />
        </div>
    )
}
