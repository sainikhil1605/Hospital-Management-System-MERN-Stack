import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Appointments } from '../doctor/appointments.schema';
import { Patient } from './patient.schema';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(Appointments.name)
    private appointmentModel: Model<Appointments>,
  ) {}

  async getProfile(id: string) {
    return await this.patientModel
      .findOne({ patientDetails: id })
      .populate('patientDetails', 'email name');
  }
  async updateProfile(id: string, patientDetails: Patient) {
    return await this.patientModel.findOneAndUpdate(
      { patientDetails: id },
      patientDetails,
      { new: true },
    );
  }
  async bookAppointment(appointmentDetails: Appointments, id: string) {
    return await this.appointmentModel.create({
      ...appointmentDetails,
      patientId: id,
    });
  }
  async getAppointments(id: string) {
    return await this.appointmentModel.find({ patientId: id });
  }
}
