import { Schema, model, models } from 'mongoose';
import {
  Guardian,
  IStudent,
  LocalGuardian,
  StudentMethod,
  StudentStaticMethod,
  Username,
} from './student.interface';

const userNameSchema = new Schema<Username>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    maxlength: [20, 'First name cannot exceed 20 characters.'],
    minlength: [2, 'First name must be at least 2 characters long.'],
    trim: true,
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    maxlength: [20, 'Last name cannot exceed 20 characters.'],
    minlength: [2, 'Last name must be at least 2 characters long.'],
    trim: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: userNameSchema,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
    trim: true,
  },
  motherName: {
    type: userNameSchema,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
    trim: true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: userNameSchema,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
    trim: true,
  },
});

const studentSchema = new Schema<IStudent, StudentStaticMethod, StudentMethod>({
  id: {
    type: String,
    unique: true,
    required: [true, 'Student ID is required.'],
    trim: true,
  },
  name: {
    type: userNameSchema,
    required: [true, "Student's name is required."],
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  dob: {
    type: String,
    validate: {
      validator: (v: string) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v),
      message: 'Date of birth must be in YYYY-MM-DD format.',
    },
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Contact number is required.'],
    trim: true,
  },
  emergencyContactNo: {
    type: String,
    required: [true, 'Emergency contact number is required.'],
    trim: true,
  },
  presentAddress: {
    type: String,
    required: [true, 'Present address is required.'],
    trim: true,
  },
  permanentAddress: {
    type: String,
    required: [true, 'Permanent address is required.'],
    trim: true,
  },
  profileImg: {
    type: String,
    trim: true,
  },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian information is required.'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local guardian information is required.'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female'],
      message: 'Gender must be either "male" or "female".',
    },
    required: [true, 'Gender is required.'],
    trim: true,
  },
  bloodGroup: {
    type: String,
    enum: {
      values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      message:
        'Invalid blood group. Allowed values are A+, A-, B+, B-, AB+, AB-, O+, O-.',
    },
    trim: true,
  },
  isActive: {
    type: String,
    enum: {
      values: ['active', 'blocked'],
      message: 'Status must be either "active" or "blocked".',
    },
    default: 'active',
    trim: true,
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const student = await StudentModel.findOne({ id });
  return student;
};

// Create model
const StudentModel =
  models.Student || model<IStudent, StudentMethod>('Student', studentSchema);

export default StudentModel;
