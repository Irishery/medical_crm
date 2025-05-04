from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum


# Перечисление ролей пользователей
class UserRole(str, Enum):
    admin = "admin"
    doctor = "doctor"
    head_doctor = "head_doctor"

# Базовая модель пользователя


class UserBase(BaseModel):
    username: str
    role: UserRole

# Модель для создания пользователя (с паролем)


class UserCreate(UserBase):
    password: str

# Модель для ответа пользователя (без пароля)


class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True

# Базовая модель врача


class DoctorBase(BaseModel):
    username: str
    speciality: str
    contact_info: str
    full_name: str

# Модель для создания врача


class DoctorCreate(DoctorBase):
    pass

    # Модель для ответа врача


class DoctorResponse(DoctorBase):
    id: int

    class Config:
        orm_mode = True


class DoctorUpdate(DoctorBase):
    pass


class DoctorResponseTable(BaseModel):
    doctors: List[DoctorResponse]
    total: int


class AdminBase(BaseModel):
    username: str
    full_name: str
    contact_info: str


class AdminCreate(AdminBase):
    pass


class AdminResponse(AdminBase):
    id: int

    class Config:
        orm_mode = True


class AdminResponseTable(BaseModel):
    admins: List[AdminResponse]
    total: int

# Базовая модель пациента


class PatientBase(BaseModel):
    full_name: str
    contact_info: str

# Модель для создания пациента


class PatientCreate(PatientBase):
    pass

# Модель для ответа пациента


class PatientResponse(PatientBase):
    id: int
    medical_record_id: int

    class Config:
        orm_mode = True


class PatientResponseTable(BaseModel):
    patients: List[PatientResponse]
    total: int


# Базовая модель приёма


class AppointmentBase(BaseModel):
    date_time: datetime
    status: str
    notes: Optional[str] = None

# Модель для создания приёма


class AppointmentCreate(AppointmentBase):
    pass

# Модель для ответа приёма


class AppointmentResponse(AppointmentBase):
    id: int
    doctor: DoctorResponse
    patient: PatientResponse

    class Config:
        orm_mode = True

# Базовая модель расписания врача


class ScheduleBase(BaseModel):
    date_time: datetime
    comments: Optional[str] = None


class ScheduleCreate(ScheduleBase):
    doctor_id: int
    patient_id: int


class ScheduleUpdate(ScheduleBase):
    doctor_id: int
    patient_id: int


class ScheduleUpdateResponse(ScheduleBase):
    id: int
    doctor_id: int
    patient_id: int
    doctor_name: str
    patient_name: str


class ScheduleResponse(ScheduleBase):
    id: int

    class Config:
        orm_mode = True


class ScheduleResponseDetailed(ScheduleBase):
    id: int
    patient: PatientResponse
    doctor: DoctorResponse

    class Config:
        orm_mode = True


# Базовая модель медицинской карты


class MedicalRecordBase(BaseModel):
    full_name: str
    gender: Optional[str] = None
    dob: Optional[str] = None
    registration_address: Optional[str] = None
    insurance_series_number: Optional[str] = None
    insurance_company: Optional[str] = None
    social_security_number: Optional[str] = None
    benefit_code: Optional[str] = None
    identity_document: Optional[str] = None
    diseases: Optional[str] = None
    icd_code: Optional[str] = None

# Модель для создания медицинской карты


class MedicalRecordCreate(MedicalRecordBase):
    pass

# Модель для ответа медицинской карты


class MedicalRecordResponse(MedicalRecordBase):
    id: int

    class Config:
        orm_mode = True


class MedicalRecordUpdate(MedicalRecordBase):
    pass

# Базовая модель консультации


class ConsultationBase(BaseModel):
    date_time: datetime
    diagnosis: str
    patient_review: Optional[str] = None
    treatment: Optional[str] = None
    doctor_notes: Optional[str] = None

# Модель для создания консультации


class ConsultationCreate(ConsultationBase):
    pass

# Модель для ответа консультации


class ConsultationResponse(ConsultationBase):
    id: int
    doctor: DoctorResponse
    patient: PatientResponse
    medical_record: MedicalRecordResponse

    class Config:
        orm_mode = True


# Модель для возврата информации о токене
class Token(BaseModel):
    access_token: str
    token_type: str

# Модель для проверки данных токена (если нужно)


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None


class BaseUserInfo(BaseModel):
    full_name: str
    contact_info: str
