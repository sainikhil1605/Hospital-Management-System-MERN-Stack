import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin/admin.schema';
import { Doctor } from './doctor/doctor.schema';
import { Patient } from './patient/patient.schema';
import { User } from './users.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
    @InjectModel(Patient.name) private patientModel: Model<Patient>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findUser(email: string, role: string): Promise<User> {
    return await this.userModel.findOne({ email, role });
  }
  async register(userDetails: any) {
    return this.userModel.create({ ...userDetails });
  }
}
