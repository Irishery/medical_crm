from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.stores import crud, schemas, models
from app.stores.database import get_db
from typing import List, Optional
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
import logging

router = APIRouter()

logger = logging.getLogger('uvicorn.error')
logger.setLevel(logging.DEBUG)

# Для аутентификации через OAuth2
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# Получить текущего пользователя

# CRUD для пользователей


@router.post("/users/", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(
            status_code=400, detail="Пользователь с таким именем уже существует")
    return crud.create_user(db=db, user=user)


@router.get("/users/", response_model=List[schemas.UserResponse])
def read_users(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@router.get("/users/{user_id}", response_model=schemas.UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return db_user


@router.delete("/users/{user_id}", response_model=schemas.UserResponse)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    crud.delete_user(db=db, user_id=user_id)
    return {"message": "Пользователь удалён"}


@router.get("/users/{username}/", response_model=schemas.UserResponse)
def read_user_by_username(username: str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_username(db, username=username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    return db_user

# CRUD для врачей с сортировкой


@router.post("/doctors/", response_model=schemas.DoctorResponse)
def create_doctor(doctor: schemas.DoctorCreate, db: Session = Depends(get_db)):
    return crud.create_doctor(db=db, doctor=doctor)


# @router.get("/doctors/", response_model=List[schemas.DoctorResponse])
# def get_doctors(skip: int = 0, limit: int = 10, sort_by: str = "full_name", db: Session = Depends(get_db)):
#     doctors = crud.get_doctors(db, skip=skip, limit=limit, sort_by=sort_by)
#     return doctors


@router.get("/doctors/{doctor_id}", response_model=schemas.DoctorResponse)
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = crud.get_doctor(db, doctor_id=doctor_id)
    if doctor is None:
        raise HTTPException(status_code=404, detail="Врач не найден")
    return doctor


@router.get("/doctors/", response_model=List[schemas.DoctorResponse])
def get_doctors(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    doctors = crud.get_doctors(db, skip=skip, limit=limit, search=search)
    return doctors


@router.get("/doctors_v2/", response_model=schemas.DoctorResponseTable)
def get_doctors_v2(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):

    doctors, total = crud.get_doctors_v2(
        db, skip=skip, limit=limit, search=search)
    return {"doctors": doctors, "total": total}


@router.get("/doctors/{username}/", response_model=schemas.DoctorResponse)
def get_doctor_by_username(username: str, db: Session = Depends(get_db)):
    doctor = crud.get_doctor_by_username(db, username=username)
    if doctor is None:
        raise HTTPException(status_code=404, detail="Врач не найден")
    return doctor


@router.delete("/doctors/{doctor_id}", response_model=schemas.DoctorResponse)
def delete_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = crud.get_doctor(db, doctor_id=doctor_id)
    if doctor is None:
        raise HTTPException(status_code=404, detail="Врач не найден")
    crud.delete_doctor(db=db, doctor_id=doctor_id)
    return doctor

# CRUD для пациентов с сортировкой


@router.get("/patients/", response_model=List[schemas.PatientResponse])
def get_patients(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    patients = crud.get_patients(db, skip=skip, limit=limit, search=search)
    return patients


@router.get("/patients_v2/", response_model=schemas.PatientResponseTable)
def get_patients_v2(
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):

    patients, total = crud.get_patients_v2(
        db, skip=skip, limit=limit, search=search)
    return {"patients": patients, "total": total}


@router.post("/patients/", response_model=schemas.PatientResponse)
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    return crud.create_patient(db=db, patient=patient)


@router.delete("/patients/{patient_id}", response_model=schemas.PatientResponse)
def delete_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = crud.get_patient(db, patient_id=patient_id)
    if patient is None:
        raise HTTPException(status_code=404, detail="Пациент не найден")
    crud.delete_patient(db=db, patient_id=patient_id)
    return {"message": "Пациент удалён"}

# CRUD для приёмов


@router.get("/appointments/", response_model=List[schemas.AppointmentResponse])
def get_appointments(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    appointments = crud.get_appointments(db, skip=skip, limit=limit)
    return appointments


@router.post("/appointments/", response_model=schemas.AppointmentResponse)
def create_appointment(appointment: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    return crud.create_appointment(db=db, appointment=appointment)


@router.delete("/appointments/{appointment_id}", response_model=schemas.AppointmentResponse)
def delete_appointment(appointment_id: int, db: Session = Depends(get_db)):
    appointment = crud.get_appointment(db, appointment_id=appointment_id)
    if appointment is None:
        raise HTTPException(status_code=404, detail="Приём не найден")
    crud.delete_appointment(db=db, appointment_id=appointment_id)
    return {"message": "Приём удалён"}

# CRUD для расписания врачей


@router.get("/schedules/{doctor_id}/{month}/", response_model=List[schemas.ScheduleResponseDetailed])
def get_schedules_by_doctor_and_month(
    doctor_id: int, month: str, db: Session = Depends(get_db)
):
    """
    Get schedules for a doctor in a specific month.
    """
    return crud.get_schedules_by_doctor_and_month(db, doctor_id, month)


@router.get("/schedules/", response_model=List[schemas.ScheduleResponseDetailed])
def get_schedules(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    schedules = crud.get_schedules(db, skip=skip, limit=limit)
    return schedules


@router.post("/schedules/", response_model=schemas.ScheduleResponse)
def create_schedule(schedule: schemas.ScheduleCreate, db: Session = Depends(get_db)):
    """
    Create a new schedule for a doctor and patient.
    """
    # Validate existence of doctor and patient
    doctor = crud.get_doctor(db, schedule.doctor_id)
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")

    patient = crud.get_patient(db, schedule.patient_id)
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")

    return crud.create_schedule(db=db, schedule=schedule)


@router.delete("/schedules/{schedule_id}", response_model=schemas.ScheduleResponse)
def delete_schedule(schedule_id: int, db: Session = Depends(get_db)):
    schedule = crud.get_schedule(db, schedule_id=schedule_id)
    if schedule is None:
        raise HTTPException(status_code=404, detail="Расписание не найдено")
    crud.delete_schedule(db=db, schedule_id=schedule_id)
    return {"message": "Расписание удалено"}


@router.put("/schedules/{schedule_id}", response_model=schemas.ScheduleUpdateResponse)
def update_schedule(schedule_id: int, schedule: schemas.ScheduleUpdate, db: Session = Depends(get_db)):
    """
    Update an existing schedule.
    """
    existing_schedule = crud.get_schedule(db, schedule_id=schedule_id)
    if not existing_schedule:
        raise HTTPException(status_code=404, detail="Расписание не найдено")

    # Update the schedule

    updated_schedule_raw = crud.update_schedule(db, schedule_id, schedule)
    updated_schedule = schemas.ScheduleUpdateResponse(
        id=updated_schedule_raw.id,
        doctor_id=updated_schedule_raw.doctor_id,
        doctor_name=crud.get_doctor(
            db, updated_schedule_raw.doctor_id).full_name,
        patient_id=updated_schedule_raw.patient_id,
        patient_name=crud.get_patient(
            db, updated_schedule_raw.patient_id).full_name,
        comments=updated_schedule_raw.comments,
        date_time=updated_schedule_raw.date_time
    )
    print(updated_schedule)

    return updated_schedule


@router.get("/patients/{patient_id}/medical-card", response_model=schemas.MedicalRecordResponse)
def get_medical_record(patient_id: int, db: Session = Depends(get_db)):
    medical_card = crud.get_medical_record(db, patient_id)
    if not medical_card:
        raise HTTPException(status_code=404, detail="Medical card not found")

    return medical_card


@router.put("/patients/{patient_id}/medical-card", response_model=schemas.MedicalRecordResponse)
def update_medical_card(patient_id: int, updated_medical: schemas.MedicalRecordUpdate, db: Session = Depends(get_db)):
    # Get the patient to ensure they exist
    patient = crud.get_patient(db, patient_id=patient_id)
    if not patient:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    # Get the medical record linked to the patient
    medical_record = crud.get_medical_record(
        db, patient.medical_record_id
    )
    if not medical_record:
        raise HTTPException(
            status_code=404,
            detail="Medical record not found"
        )

    # Update the medical record
    updated_data = updated_medical
    updated_medical_record = crud.update_medical_record(
        db, medical_record.id, updated_data
    )

    if not updated_medical_record:
        raise HTTPException(
            status_code=500,
            detail="Failed to update medical record"
        )

    return updated_medical_record


@router.get("/consultations/{patient_id}", response_model=List[schemas.ConsultationResponse])
def get_consultations(patient_id: int, db: Session = Depends(get_db)):
    # Call the function to retrieve consultations for the given patient_id
    consultations = crud.get_consultations_by_patient_id(db, patient_id)
    if not consultations:
        raise HTTPException(
            status_code=404, detail="Consultations not found for this patient.")

    return consultations


@router.post("/token", response_model=schemas.Token)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    logger.debug("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa")
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    logger.debug("-------------------------")
    logger.debug(user.role.value)
    access_token = crud.create_access_token(
        data={"sub": user.username, "role": user.role.value, "user_id": user.id})
    logger.debug("------------------------")
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/users/me/", response_model=schemas.UserResponse)
def read_users_me(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    user = crud.get_current_user(db, token)
    if not user:
        raise HTTPException(status_code=400, detail="Invalid token")
    return user
