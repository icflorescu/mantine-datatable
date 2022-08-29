import dayjs, { Dayjs } from 'dayjs';
import { get, sortBy } from 'lodash';
import { DataTableSortStatus } from 'mantine-datatable';
import companyData from '~/data/companies.json';
import departmentData from '~/data/departments.json';
import employeeData from '~/data/employees.json';
import delay, { DelayOptions } from '~/lib/delay';

export type Company = {
  id: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
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

export const companies: Company[] = [...companyData];

export const departments: Department[] = departmentData.map(({ companyId, ...rest }) => ({
  ...rest,
  company: companies.find(({ id }) => id === companyId)!,
}));

export const employees: Employee[] = employeeData.map(({ departmentId, ...rest }) => ({
  ...rest,
  department: departments.find(({ id }) => id === departmentId)!,
}));

export async function getCompaniesAsync(delayOptions: DelayOptions = { min: 1000, max: 2000 }) {
  await delay(delayOptions);
  return companies;
}

export async function getEmployeesAsync({
  page,
  recordsPerPage,
  sortStatus: { columnAccessor: sortAccessor, direction: sortDirection },
  delay: delayOptions = { min: 1000, max: 2000 },
}: {
  page: number;
  recordsPerPage: number;
  sortStatus: DataTableSortStatus;
  delay?: DelayOptions;
}) {
  await delay(delayOptions);

  let now: Dayjs;
  if (sortAccessor === 'age') now = dayjs();

  let result = sortBy(employees, (employee) =>
    sortAccessor === 'name'
      ? `${employee.firstName} ${employee.lastName}`
      : sortAccessor === 'age'
      ? now.diff(employee.birthDate)
      : get(employee, sortAccessor)
  );

  if (sortDirection === 'desc') result.reverse();

  const total = result.length;
  const skip = (page - 1) * recordsPerPage;
  result = result.slice(skip, skip + recordsPerPage);

  return { total, employees: result as Employee[] };
}
