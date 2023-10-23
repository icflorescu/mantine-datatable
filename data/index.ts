import companies from './companies.json';

export { companies };

export type Company = {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  missionStatement: string;
};

export type Department = {
  id: string;
  name: string;
  company: Company;
};

export type Employee = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  department: Department;
};
