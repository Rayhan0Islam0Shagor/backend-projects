import { Schema, model, models } from 'mongoose';
import { TAcademicSemester, TMonth } from './academicSemester.interface';
import {
  academicSemesterCodes,
  academicSemesterNames,
  MONTHS,
} from './academicSemester.constant';

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      enum: academicSemesterNames,
    },
    code: {
      type: String,
      required: true,
      trim: true,
      enum: academicSemesterCodes,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      enum: MONTHS,
      required: true,
    },
    endMonth: {
      type: String,
      enum: MONTHS,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  });

  if (isExist) {
    throw new Error('Academic semester already exists');
  }

  next();
});

const AcademicSemesterModel =
  models.AcademicSemester ||
  model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemesterModel;
