import companyData from './companies.json';
import departmentData from './departments.json';
import employeeData from './employees.json';

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
  sex: 'male' | 'female';
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  department: Department;
};

export const companies: Company[] = companyData;

export const departments: Department[] = departmentData.map(({ companyId, ...rest }) => ({
  ...rest,
  company: companies.find(({ id }) => id === companyId)!,
}));

export const employees = employeeData.map(({ departmentId, ...rest }) => ({
  ...rest,
  department: departments.find(({ id }) => id === departmentId)!,
})) as Employee[];
