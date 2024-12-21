export interface IStudent {
  id: string;
  name: Username;
  email: string;
  gender: 'male' | 'female';
  profileImg?: string;
  dob: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  localGuardian: LocalGuardian;
  isActive: 'active' | 'blocked';
}

export type Username = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type LocalGuardian = {
  name: Username;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Guardian = {
  fatherName: Username;
  fatherOccupation: string;
  fatherContactNo: string;

  motherName: Username;
  motherOccupation: string;
  motherContactNo: string;
};
