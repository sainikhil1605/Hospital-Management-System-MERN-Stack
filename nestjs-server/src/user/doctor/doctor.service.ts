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
    @InjectModel(Appointments.name)
    private appointmentModel: Model<Appointments>,
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
  async getAllAppointments(id: string): Promise<Appointments[]> {
    return this.appointmentModel.find({ doctorId: id });
  }

  async addPrescription(
    id: string,
    prescription: string,
  ): Promise<Appointments> {
    return this.appointmentModel.findOneAndUpdate(
      { _id: id },
      { prescription },
      { new: true },
    );
  }
}
