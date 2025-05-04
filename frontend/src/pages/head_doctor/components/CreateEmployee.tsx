import React, { useState } from 'react'
import { Input, Modal, Button, Tabs, Tab } from '@mui/material'
import { a11yProps, TabPanel } from '@/shared/Tabs'
import DoctorForm from '@/components/NewDoctor'
import AdministratorForm from '@/components/NewAdmin'

const CreateEmployee = () => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    return (
        <div>
            <h1 className="mb-10 text-3xl font-bold">Новый сотрудник</h1>

            <Tabs
                value={value}
                onChange={handleChange}
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Врач" {...a11yProps(0)} />
                <Tab label="Администратор" {...a11yProps(1)} />
            </Tabs>
            <TabPanel value={value} index={0}>
                <DoctorForm />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <AdministratorForm />
            </TabPanel>
        </div>
    )
}

const CreateEmployeeModal = () => {
    const [open, setOpen] = useState(false)

    return (
        <>
            <Button variant="contained" onClick={() => setOpen((o) => !o)}>
                Новый сотрудник
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex items-center justify-center"
            >
                <div className="h-4/6 w-4/6 overflow-auto rounded-md bg-white px-5 py-6 shadow-md">
                    <CreateEmployee />
                </div>
            </Modal>
        </>
    )
}

export { CreateEmployeeModal }
