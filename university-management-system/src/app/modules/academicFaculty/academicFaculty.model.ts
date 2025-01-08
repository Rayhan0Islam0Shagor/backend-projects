import { Schema, model, models } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicFacultyModel =
  models.AcademicFaculty ||
  model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);

export default AcademicFacultyModel;
