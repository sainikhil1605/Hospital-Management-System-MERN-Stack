import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../users.schema';
import { Appointments } from './appointments.schema';
import { Doctor } from './doctor.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async getAllDoctors(): Promise<Doctor[]> {
    return this.doctorModel.find({}).populate('doctorDetails', 'email name');
  }
  async getDoctor(id: string): Promise<Doctor> {
    return this.doctorModel
      .findById(id)
      .populate('doctorDetails', 'email name');
  }
  async updateDoctor(id: string, doctorDetails: Doctor): Promise<Doctor> {
    return this.doctorModel.findOneAndUpdate(
      { doctorDetails: id },
      doctorDetails,
      { new: true },
    );
  }
  async deleteDoctor(id: string): Promise<Doctor> {
    return this.doctorModel.findByIdAndDelete(id);
  }
  async bookAppointment(
    id: string,
    appointment: Appointments,
  ): Promise<Doctor> {
    return this.doctorModel.findOneAndUpdate(
      { doctorDetails: id },
      { $push: { appointments: appointment } },
      { new: true },
    );
  }
  async getAllAppointments(id: string): Promise<Doctor> {
    return this.doctorModel
      .findOne({ doctorDetails: id })
      .select('appointments');
  }

  async addPrescription(id: string, prescription: string): Promise<Doctor> {
    const data = await this.doctorModel.findById(id).select('appointments');
    const appointment = data.appointments.find(
      (x) => x._id.toString() === id.toString,
    );
    appointment.prescription = prescription;
    data.save();
    return data;
  }
}
