import { Schema, model, models } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import AppError from '../../errors/AppError';

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

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartmentModel.findOne({
    name: this.name,
  });

  if (isExist) {
    throw new AppError(409, 'Academic department already exists');
  }

  next();
});

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();

  const isExist = await AcademicDepartmentModel.findOne(query);

  if (!isExist) {
    throw new AppError(404, 'Academic department not found');
  }

  next();
});

const AcademicDepartmentModel =
  models.AcademicDepartment ||
  model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);

export default AcademicDepartmentModel;
