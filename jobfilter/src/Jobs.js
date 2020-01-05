import React from 'react'

import Typography from '@material-ui/core/Typography';
import Job from './Job';
import JobModal from './JobModal'

import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

export default function Jobs({ jobs }) {
    //Modal
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    //Pagination
    const numJobs = jobs.length;
    const numPages = Math.ceil(numJobs / 50);

    const [activeStep, setActiveStep] = React.useState(0);
    const [selectedJob, selectJob] = React.useState({});

    const jobsOnPage = jobs.slice(activeStep * 50, (activeStep * 50) + 50);

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    console.log('job is', jobs[1]);
    //console.log(jobs);

    return (
        <div className="jobs">
            <JobModal open={open} job={selectedJob} handleClose={handleClose}></JobModal>
            <Typography variant="h4" component="h1">
                Entry Level Software Jobs
            </Typography>
            <Typography variant="h6" component="h2">
                Found {numJobs} Jobs
            </Typography>
            {
                jobsOnPage.map(
                    (job, i) => <Job key={i} job={job} onClick={() => {
                        console.log('clicked');
                        handleClickOpen();
                        selectJob(job)
                    }} />
                )
            }
            <div>
                Page {activeStep + 1} of {numPages}
            </div>
            <MobileStepper
                variant="progress"
                steps={numPages}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </div>
    )
}