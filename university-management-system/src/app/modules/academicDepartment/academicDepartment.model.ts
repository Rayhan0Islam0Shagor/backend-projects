import { Schema, model, models } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const AcademicDepartmentModel =
  models.AcademicDepartment ||
  model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;
