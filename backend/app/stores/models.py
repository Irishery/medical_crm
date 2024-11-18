from sqlalchemy.dialects.postgresql import TSVECTOR
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum, Text
from app.stores.database import Base
import enum
from datetime import datetime

# Определяем роли для пользователей


class UserRole(enum.Enum):
    admin = "admin"
    doctor = "doctor"
    head_doctor = "head_doctor"

# Модель пользователей системы


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)  # Используем Enum для роли

# Модель врачей


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    # Внешний ключ на таблицу Users
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    full_name = Column(String, nullable=False)
    specialty = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)

    search_vector = Column(TSVECTOR)


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    full_name = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)


# Модель пациентов


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)
    medical_record_id = Column(Integer, ForeignKey("medical_records.id"))

# Модель расписания врачей


class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True, index=True)
    # Внешний ключ на таблицу Doctors
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    date_time = Column(DateTime, nullable=False)
    comments = Column(Text, nullable=True)


class Appointment(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True)
    # Внешний ключ на таблицу Doctors
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    patient_id = Column(Integer, ForeignKey("patients.id"),
                        nullable=False)  # Внешний ключ на таблицу Patients
    date_time = Column(DateTime, nullable=False)
    # Статус приёма (назначен, завершён, отменён)
    status = Column(String, nullable=False)
    notes = Column(Text, nullable=True)  # Примечания


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)  # Дата создания
    full_name = Column(String, nullable=False)  # ФИО пациента
    gender = Column(String, nullable=False)  # Пол пациента
    dob = Column(DateTime, nullable=False)  # Дата рождения
    registration_address = Column(String, nullable=False)  # Место регистрации
    insurance_series_number = Column(
        String, nullable=False)  # Серия и номер полиса ОМС
    # Страховая медицинская организация
    insurance_company = Column(String, nullable=False)
    social_security_number = Column(String, nullable=False)  # СНИЛС
    benefit_code = Column(String, nullable=True)  # Код льготы
    # Документ удостоверяющий личность
    identity_document = Column(String, nullable=False)
    diseases = Column(Text, nullable=True)  # Список заболеваний
    icd_code = Column(String, nullable=True)  # Код по МКБ-10

# Модель консультаций


class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"),
                        nullable=False)  # Внешний ключ на таблицу Patients
    # Внешний ключ на таблицу Doctors
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    medical_record_id = Column(Integer, ForeignKey(
        # Внешний ключ на таблицу MedicalRecords
        "medical_records.id"), nullable=False)
    date_time = Column(DateTime, nullable=False)  # Дата и время консультации
    diagnosis = Column(Text, nullable=False)  # Диагноз
    patient_review = Column(Text, nullable=True)  # Осмотр пациента
    treatment = Column(Text, nullable=True)  # Лечение и назначения
    doctor_notes = Column(Text, nullable=True)  # Примечания врача
