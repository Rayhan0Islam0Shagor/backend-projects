import { Schema, model, models } from 'mongoose';
import {
  Guardian,
  IStudent,
  LocalGuardian,
  Username,
} from './student.interface';

const userNameSchema = new Schema<Username>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: userNameSchema,
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: userNameSchema,
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: userNameSchema,
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

// Define schema
const studentSchema = new Schema<IStudent>({
  id: { type: String, unique: true },
  name: userNameSchema,
  email: { type: String, required: true, unique: true, lowercase: true },
  dob: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  profileImg: { type: String },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  gender: ['male', 'female'],
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

// Create model
const StudentModel =
  models.Student || model<IStudent>('Student', studentSchema);

export default StudentModel;
