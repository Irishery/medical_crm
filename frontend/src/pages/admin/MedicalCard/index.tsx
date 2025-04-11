import React, { ComponentProps, useState } from "react";
import { Box, Button, Modal, TextareaAutosize } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@mui/material";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const MedicalCardButton = (props: ComponentProps<typeof Button>) => {
    return <Button variant='contained' {...props}>Медкарта</Button>;
};
const MedicalCardContent = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
    } = useForm();

    const onSubmit = (data: Record<string, string>) => { };

    return (
        <div className="rounded-md bg-white shadow-md w-[80%] overflow-scroll min-h-96 px-5 py-6">
            <div className="flex flex-col gap-10 h-full">
                <h3 className="text-lg text-left">Медкарта</h3>
                <div className="grid grid-cols-2 gap-5">
                    <form
                        id="new_patient_form"
                        className="flex flex-col gap-10 h-full"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name">ФИО</label>
                                <Input
                                    id="name"
                                    defaultValue="ФИО"
                                    {...(register("name"), { required: true })}
                                />
                                {errors.exampleRequired && (
                                    <span>Это поле обязательно</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="floor">ПОЛ</label>
                                <Input
                                    id="floor"
                                    defaultValue=""
                                    {...(register("floor"), { required: true })}
                                />
                                {errors.exampleRequired && (
                                    <span>Это поле обязательно</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="passport">Серия и номер паспорта</label>
                                <Input
                                    id="passport"
                                    defaultValue=""
                                    {...(register("passport"), { required: true })}
                                />
                                {errors.exampleRequired && (
                                    <span>Это поле обязательно</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="polis">Серия и номер полиса ОМС</label>
                                <Input
                                    id="polis"
                                    defaultValue=""
                                    {...(register("polis"), { required: true })}
                                />
                                {errors.exampleRequired && (
                                    <span>Это поле обязательно</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="code">Код льготы</label>
                                <Input
                                    id="code"
                                    defaultValue=""
                                    {...(register("code"), { required: true })}
                                />
                                {errors.exampleRequired && (
                                    <span>Это поле обязательно</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="disease">Список заболеваний</label>
                                <TextareaAutosize
                                    id="disease"
                                    defaultValue=""
                                    {...(register("disease"), { required: true })}
                                />
                                {errors.exampleRequired && (
                                    <span>Это поле обязательно</span>
                                )}
                            </div>
        
                           
                    </form>

                    <div className="bg-red-600"></div>
                </div>

                <div className="flex justify-between  ">
                    <Button type="button">Медкарта</Button>
                    <Button form="new_patient_form" type="submit">
                        Добавить
                    </Button>
                </div>
            </div>
        </div>
    );
};

const MedicalCard = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <MedicalCardButton onClick={() => setOpen((o) => !o)} />
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                className="flex justify-center items-center"
            >
                <MedicalCardContent />
            </Modal>
        </>
    );
};

export default MedicalCard;
