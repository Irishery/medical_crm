# crud.py
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from jose import jwt
from sqlalchemy import extract
from sqlalchemy.orm import aliased
from sqlalchemy import func, desc, extract
from sqlalchemy.orm import Session, aliased
from . import models, schemas
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_full_name(db: Session, user_id: int):
    return db.query(models.User.full_name).filter(models.User.id == user_id).first()


def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def get_doctor_by_username(db: Session, username: str):
    return db.query(models.Doctor).filter(models.Doctor.username == username).first()


def if_doctor_exists(db: Session, username: str):
    return db.query(models.Doctor).filter(models.Doctor.username == username).first() is not None


def if_admin_exists(db: Session, username: str):
    return db.query(models.Admin).filter(models.Admin.username == username).first() is not None


def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = pwd_context.hash(user.password)
    user.password = hashed_password
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_users(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.User).offset(skip).limit(limit).all()


def create_admin(db: Session, admin: schemas.AdminCreate):
    db_admin = models.Admin(**admin.dict())
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin


def get_admin(db: Session, admin_id: int):
    return db.query(models.Admin).filter(models.Admin.id == admin_id).first()


def get_admin_by_username(db: Session, username: str):
    return db.query(models.Admin).filter(models.Admin.username == username).first()


def delete_adminn(db: Session, admin_id: int):
    db.query(models.Admin).filter(models.Admin.id == admin_id).delete()
    db.commit()


def update_admin(db: Session, admin_id: int, admin: schemas.AdminUpdate):
    db_admin = db.query(models.Admin).filter(
        models.Admin.id == admin_id).first()
    if db_admin:
        for key, value in admin.dict().items():
            setattr(db_admin, key, value)
        db.commit()
        db.refresh(db_admin)
    return db_admin


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


def get_doctors_v2(db: Session, skip: int = 0, limit: int = 10, search: str = None):
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

    total = query.count()

    return query.offset(skip).limit(limit).all(), total


def update_doctor(db: Session, doctor_id: int, doctor: schemas.DoctorUpdate):
    db_doctor = db.query(models.Doctor).filter(
        models.Doctor.id == doctor_id).first()
    if db_doctor:
        for key, value in doctor.dict().items():
            setattr(db_doctor, key, value)
        db.commit()
        db.refresh(db_doctor)
    return db_doctor


def delete_doctor(db: Session, doctor_id: int):
    db.query(models.Doctor).filter(models.Doctor.id == doctor_id).delete()
    db.commit()


def create_doctor(db: Session, doctor: schemas.DoctorCreate):
    db_doctor = models.Doctor(**doctor.dict())
    db.add(db_doctor)
    db.commit()
    db.refresh(db_doctor)
    return db_doctor


def get_patients(db: Session, skip: int = 0, limit: int = 10, search: str = None):
    query = db.query(models.Patient)

    if search:
        # Split search string into tokens and create a prefix query
        search_tokens = search.split()
        search_query = " & ".join([f"{token}:*" for token in search_tokens])

        # Generate search vector and tsquery
        search_vector = func.to_tsvector(
            "russian", models.Patient.full_name + ' ' + models.Patient.contact_info)
        ts_query = func.to_tsquery("russian", search_query)

        print(search)

        # Filter and sort by relevance
        query = query.filter(search_vector.op("@@")(ts_query))
        query = query.order_by(desc(func.ts_rank(search_vector, ts_query)))

    return query.offset(skip).limit(limit).all()


def get_patients_v2(db: Session, skip: int = 0, limit: int = 10, search: str = None):
    query = db.query(models.Patient)

    if search:
        # Split search string into tokens and create a prefix query
        search_tokens = search.split()
        search_query = " & ".join([f"{token}:*" for token in search_tokens])

        # Generate search vector and tsquery
        search_vector = func.to_tsvector(
            "russian", models.Patient.full_name + ' ' + models.Patient.contact_info)
        ts_query = func.to_tsquery("russian", search_query)

        # Filter and sort by relevance
        query = query.filter(search_vector.op("@@")(ts_query))
        query = query.order_by(desc(func.ts_rank(search_vector, ts_query)))

    total = query.count()

    return query.offset(skip).limit(limit).all(), total


def get_admins(db: Session, skip: int = 0, limit: int = 10, search: str = None):
    query = db.query(models.Admin)

    if search:
        # Split search string into tokens and create a prefix query
        search_tokens = search.split()
        search_query = " & ".join([f"{token}:*" for token in search_tokens])

        # Generate search vector and tsquery
        search_vector = func.to_tsvector(
            "russian", models.Admin.full_name + ' ' + models.User.username)
        ts_query = func.to_tsquery("russian", search_query)

        # Filter and sort by relevance
        query = query.filter(search_vector.op("@@")(ts_query))
        query = query.order_by(desc(func.ts_rank(search_vector, ts_query)))

    total = query.count()

    return query.offset(skip).limit(limit).all(), total


def create_patient(db: Session, patient: schemas.PatientCreate):
    db_patient = models.Patient(**patient.dict())
    db_patient.contact_info = "".join(db_patient.contact_info.split())
    db_patient.contact_info = db_patient.contact_info.replace("+", "")
    db_patient.contact_info = db_patient.contact_info.replace("(", "")
    db_patient.contact_info = db_patient.contact_info.replace(")", "")
    db_patient.contact_info = db_patient.contact_info.replace("-", "")

    medical_record = create_medical_record(db, schemas.MedicalRecordCreate(
        full_name=db_patient.full_name))

    db_patient.medical_record_id = medical_record.id
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient


def get_patient(db: Session, patient_id: int):
    return db.query(models.Patient).filter(models.Patient.id == patient_id).first()


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


def get_schedules_by_doctor_and_month(db: Session, doctor_id: int, month: str):
    """
    Retrieve schedules for a doctor within a specific month, including patient details.
    """
    year, month_part = map(int, month.split('-'))

    # Aliases for clarity
    PatientAlias = aliased(models.Patient)
    DoctorAlias = aliased(models.Doctor)

    # Query to join schedules with doctor and patient data
    result = (
        db.query(
            models.Schedule.id,
            models.Schedule.date_time,
            models.Schedule.comments,
            PatientAlias.id.label("patient_id"),
            PatientAlias.medical_record_id.label("medical_record_id"),
            PatientAlias.full_name.label("patient_name"),
            PatientAlias.contact_info.label("patient_contact"),
            DoctorAlias.id.label("doctor_id"),
            DoctorAlias.username.label("doctor_username"),
            DoctorAlias.full_name.label("doctor_name"),
            DoctorAlias.speciality.label("doctor_speciality"),
            DoctorAlias.contact_info.label("doctor_contact"),
        )
        .join(PatientAlias, models.Schedule.patient_id == PatientAlias.id)
        .join(DoctorAlias, models.Schedule.doctor_id == DoctorAlias.id)
        .filter(
            models.Schedule.doctor_id == doctor_id,
            extract('year', models.Schedule.date_time) == year,
            extract('month', models.Schedule.date_time) == month_part
        )
        .all()
    )

    # Map result to schemas
    schedules = []
    for row in result:
        print("DEBUG ", row)
        schedules.append(
            schemas.ScheduleResponseDetailed(
                id=row.id,
                date_time=row.date_time,
                comments=row.comments,
                patient=schemas.PatientResponse(
                    id=row.patient_id,
                    full_name=row.patient_name,
                    contact_info=row.patient_contact,
                    # Placeholder if medical record is required
                    medical_record_id=row.medical_record_id,
                ) if row.patient_id else None,
                doctor=schemas.DoctorResponse(
                    id=row.doctor_id,
                    full_name=row.doctor_name,
                    speciality=row.doctor_speciality,
                    contact_info=row.doctor_contact,
                    username=row.doctor_username,  # Placeholder if username is required
                ) if row.doctor_id else None,
            )
        )

    for schedule in schedules:
        print("DEBUG1", schedule)

    return schedules


# TODO: add backpopulates in models to make this function easier


def get_schedules(db: Session, skip: int = 0, limit: int = 10):
    """
    Retrieve schedules with detailed patient and doctor information.
    """
    # Aliases for clarity
    PatientAlias = aliased(models.Patient)
    DoctorAlias = aliased(models.Doctor)

    # Query to join Schedule with Patient and Doctor
    result = (
        db.query(
            models.Schedule.id,
            models.Schedule.date_time,
            models.Schedule.comments,
            PatientAlias.id.label("patient_id"),
            PatientAlias.medical_record_id.label("medical_record_id"),
            PatientAlias.full_name.label("patient_name"),
            PatientAlias.contact_info.label("patient_contact"),
            DoctorAlias.id.label("doctor_id"),
            DoctorAlias.username.label("doctor_username"),
            DoctorAlias.full_name.label("doctor_name"),
            DoctorAlias.speciality.label("doctor_speciality"),
            DoctorAlias.contact_info.label("doctor_contact"),
        )
        .join(PatientAlias, models.Schedule.patient_id == PatientAlias.id)
        .join(DoctorAlias, models.Schedule.doctor_id == DoctorAlias.id)
        .offset(skip)
        .limit(limit)
        .all()
    )

    # Mapping result to schemas
    schedules = []
    for row in result:
        schedules.append(
            schemas.ScheduleResponse(
                id=row.id,
                date_time=row.date_time,
                comments=row.comments,
                patient=schemas.PatientResponse(
                    id=row.patient_id,
                    full_name=row.patient_name,
                    contact_info=row.patient_contact,
                    # Placeholder if medical record is required
                    medical_record_id=row.medical_record_id,
                ),
                doctor=schemas.DoctorResponse(
                    id=row.doctor_id,
                    full_name=row.doctor_name,
                    speciality=row.doctor_speciality,
                    contact_info=row.doctor_contact,
                    username=row.doctor_username,  # Placeholder if username is required
                ),
            )
        )

    return schedules


def get_schedule(db: Session, schedule_id: int):
    return db.query(models.Schedule).filter(models.Schedule.id == schedule_id).first()


def update_schedule(db: Session, schedule_id: int, schedule: schemas.ScheduleUpdate):
    db_schedule = db.query(models.Schedule).filter(
        models.Schedule.id == schedule_id).first()
    if db_schedule:
        for key, value in schedule.dict().items():
            setattr(db_schedule, key, value)
        db.commit()
        db.refresh(db_schedule)
    return db_schedule


def get_medical_record(db: Session, medical_record_id: int):
    return db.query(models.MedicalRecord).filter(models.MedicalRecord.id == medical_record_id).first()


def update_medical_record(db: Session, medical_record_id: int, medical_record: schemas.MedicalRecordUpdate):
    db_medical_record = db.query(models.MedicalRecord).filter(
        models.MedicalRecord.id == medical_record_id).first()
    if db_medical_record:
        for key, value in medical_record.dict(exclude_unset=True).items():
            setattr(db_medical_record, key, value)
        db.commit()
        db.refresh(db_medical_record)
    return db_medical_record


# Function to get consultations by patient id


def get_consultations_by_patient_id(db: Session, patient_id: int):
    # Query the Consultation table to find all consultations with the provided patient_id
    consultations = db.query(models.Consultation).filter(
        models.Consultation.patient_id == patient_id).all()

    # Return a list of ConsultationResponse Pydantic models from the query results
    return [schemas.ConsultationResponse.from_orm(consultation) for consultation in consultations]


def create_consultation(db: Session, consultation: schemas.ConsultationCreate):
    db_consultation = models.Consultation(**consultation.dict())
    db.add(db_consultation)
    db.commit()
    db.refresh(db_consultation)
    return db_consultation


def update_consultation(db: Session, consultation_id: int, consultation: schemas.ConsultationUpdate):
    db_consultation = db.query(models.Consultation).filter(
        models.Consultation.id == consultation_id).first()
    if db_consultation:
        for key, value in consultation.dict().items():
            setattr(db_consultation, key, value)
        db.commit()
        db.refresh(db_consultation)
    return db_consultation


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30


def authenticate_user(db, username: str, password: str):
    user = get_user_by_username(db, username)
    if not user:
        return False
    if not pwd_context.verify(password, user.password):
        return False
    return user


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


def get_current_user(db, token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            return None
        user = get_user_by_username(db, username)
        return user
    except jwt.JWTError:
        return None
