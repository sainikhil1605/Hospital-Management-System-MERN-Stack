import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Admin } from 'mongodb';
import { Model } from 'mongoose';
import { Appointments } from '../doctor/appointments.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Appointments.name)
    private appointmentModel: Model<Appointments>,
  ) {}
  async getAdmin(id: string): Promise<Admin> {
    return await this.adminModel
      .findOne({ adminDetails: id })
      .populate('adminDetails', 'email name');
  }
  async updateAdmin(id: string, adminDetails: any): Promise<Admin> {
    return await this.adminModel.findOneAndUpdate(
      { adminDetails: id },
      adminDetails,
      { new: true },
    );
  }
  async getAllAppointments(): Promise<Appointments[]> {
    return await this.appointmentModel.find({});
  }
}
