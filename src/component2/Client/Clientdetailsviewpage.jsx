import { ArrowBack } from '@mui/icons-material'
import React from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
export default function Clientdetailsviewpage() {
  const location = useLocation()
  const navigate = useNavigate()
  const datat = (location?.state?.data)
  console.log(datat)
  return (
    <div className="main_container">
      <div className="container">
        <div className="client_details">
          <ArrowBack style={{ cursor: "pointer" }} onClick={() => { navigate('/Admin/Clients') }} />
          <h2>Client Details</h2>
          <div>
            <h5 className='mb-3'>Basic Information</h5>
            <div className="row">
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Name</p>
                  <h6>{datat?.name}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Email</p>
                  <h6>{datat?.email}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Phone Number</p>
                  <h6>{datat?.phone_no}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Company HQ</p>
                  <h6>{datat?.company_HQ}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Company Industry</p>
                  <h6>{datat?.company_industry}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Company Name</p>
                  <h6>{datat?.company_name}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Package Name</p>
                  <h6>{datat?.package_name}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Package Type</p>
                  <h6>{datat?.package_type}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Package Start Date</p>
                  <h6>{new Date(datat?.package_active_date).toLocaleDateString("en-GB")}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Package End Date</p>
                  <h6>{new Date(datat?.package_end_date).toLocaleDateString("en-GB")}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Job Count</p>
                  <h6>{datat.jobCount}</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Job Active Days</p>
                  <h6>{datat.job_active_days}{" "} Days</h6>
                </div>
              </div>
              <div className="col-md-3">
                <div className='inner_section'>
                  <p>Portel Access Days</p>
                  <h6>{datat.portel_access_days}{" "} Days</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
