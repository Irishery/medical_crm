from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum, Text
from sqlalchemy.orm import relationship
from app.stores.database import Base
import enum
from datetime import datetime

# Определяем роли для пользователей


class UserRole(enum.Enum):
    admin = "администратор"
    doctor = "врач"
    head_doctor = "главный врач"

# Модель пользователей системы


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)  # Используем Enum для роли
    full_name = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)

    # Связь с таблицей Doctors
    doctor = relationship("Doctor", back_populates="user", uselist=False)

# Модель врачей


class Doctor(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True)
    # Внешний ключ на таблицу Users
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    specialty = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)
    statistics = Column(Text, nullable=True)

    # Связь с таблицей Users
    user = relationship("User", back_populates="doctor")

    # Связь с таблицей Appointments и Schedules
    appointments = relationship("Appointment", back_populates="doctor")
    schedules = relationship("Schedule", back_populates="doctor")

# Модель пациентов


class Patient(Base):
    __tablename__ = "patients"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    contact_info = Column(String, nullable=False)
    medical_record_id = Column(Integer, ForeignKey("medical_records.id"))

    # Связь с таблицей MedicalRecords и Appointments
    medical_record = relationship("MedicalRecord", back_populates="patient")
    appointments = relationship("Appointment", back_populates="patient")

# Модель расписания врачей


class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True, index=True)
    # Внешний ключ на таблицу Doctors
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    date_time = Column(DateTime, nullable=False)
    comments = Column(Text, nullable=True)

    # Связь с таблицей Doctors
    doctor = relationship("Doctor", back_populates="schedules")

# Модель записей на приём


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

    # Связи с таблицами Doctors и Patients
    doctor = relationship("Doctor", back_populates="appointments")
    patient = relationship("Patient", back_populates="appointments")

# Модель медицинских карт


class MedicalRecord(Base):
    __tablename__ = "medical_records"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"),
                        nullable=False)  # Внешний ключ на таблицу Patients
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

    # Связь с таблицей Patients
    patient = relationship("Patient", back_populates="medical_record")

# Модель консультаций


class Consultation(Base):
    __tablename__ = "consultations"

    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"),
                        nullable=False)  # Внешний ключ на таблицу Patients
    # Внешний ключ на таблицу Doctors
    doctor_id = Column(Integer, ForeignKey("doctors.id"), nullable=False)
    medical_record_id = Column(Integer, ForeignKey(
        "medical_records.id"), nullable=False)  # Внешний ключ на таблицу MedicalRecords
    date_time = Column(DateTime, nullable=False)  # Дата и время консультации
    diagnosis = Column(Text, nullable=False)  # Диагноз
    patient_review = Column(Text, nullable=True)  # Осмотр пациента
    treatment = Column(Text, nullable=True)  # Лечение и назначения
    doctor_notes = Column(Text, nullable=True)  # Примечания врача

    # Связи с таблицами Doctors, Patients и MedicalRecords
    doctor = relationship("Doctor")
    patient = relationship("Patient")
    medical_record = relationship("MedicalRecord")
