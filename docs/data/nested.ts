import { companies as companyData, departments as departmentData, employees } from './index';

export const departments = departmentData.map((department) => ({
  ...department,
  employees: employees.filter((employee) => employee.department.id === department.id)?.length || 0,
}));

export const companies = companyData.map((company) => ({
  ...company,
  employees: departments
    .filter((department) => department.company.id === company.id)
    .reduce((sum, department) => sum + department.employees, 0),
}));

export { employees };
