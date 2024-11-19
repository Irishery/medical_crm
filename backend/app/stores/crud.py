# crud.py
from sqlalchemy import func, desc
from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_full_name(db: Session, user_id: int):
    return db.query(models.User.full_name).filter(models.User.id == user_id).first()


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    user.password = hashed_password
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_doctor(db: Session, doctor_id: int):
    return db.query(models.Doctor).filter(models.Doctor.id == doctor_id).first()


def get_doctors(db: Session, skip: int = 0, limit: int = 10, search: str = None):
    query = db.query(models.Doctor)

    if search:
        # Split search string into tokens and create a prefix query
        search_tokens = search.split()
        search_query = " & ".join([f"{token}:*" for token in search_tokens])

        # Generate search vector and tsquery
        search_vector = func.to_tsvector(
            "russian", models.Doctor.full_name + ' ' + models.Doctor.speciality)
        ts_query = func.to_tsquery("russian", search_query)

        # Filter and sort by relevance
        query = query.filter(search_vector.op("@@")(ts_query))
        query = query.order_by(desc(func.ts_rank(search_vector, ts_query)))

    return query.offset(skip).limit(limit).all()


def delete_doctor(db: Session, doctor_id: int):
    db.query(models.Doctor).filter(models.Doctor.id == doctor_id).delete()
    db.commit()


def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    db_doctor = models.Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def create_patient(db: Session, patient: schemas.PatientCreate):
    db_patient = models.Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def create_appointment(db: Session, appointment: schemas.AppointmentCreate):
    db_appointment = models.Appointment(**appointment.dict())
    db.add(db_appointment)
    db.commit()
    db.refresh(db_appointment)
    return db_appointment


def create_schedule(db: Session, schedule: schemas.ScheduleCreate):
    db_schedule = models.Schedule(**schedule.dict())
    db.add(db_schedule)
    db.commit()
    db.refresh(db_schedule)
    return db_schedule


def create_medical_record(db: Session, medical_record: schemas.MedicalRecordCreate):
    db_medical_record = models.MedicalRecord(**medical_record.dict())
    db.add(db_medical_record)
    db.commit()
    db.refresh(db_medical_record)
    return db_medical_record


def create_consultation(db: Session, consultation: schemas.ConsultationCreate):
    db_consultation = models.Consultation(**consultation.dict())
    db.add(db_consultation)
    db.commit()
    db.refresh(db_consultation)
    return db_consultation
