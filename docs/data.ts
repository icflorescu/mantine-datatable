import dayjs, { Dayjs } from 'dayjs';
import { get, sortBy } from 'lodash';
import { DataTableSortStatus } from 'mantine-datatable';
import data from './data.json';

const departments = data.departments.map(({ companyId, ...rest }) => ({
  ...rest,
  company: data.companies.find(({ id }) => id === companyId),
}));

const employees = data.employees.map(({ departmentId, ...rest }) => ({
  ...rest,
  department: departments.find(({ id }) => id === departmentId),
}));

export type EmployeeData = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  department: {
    id: string;
    name: string;
    company: {
      id: string;
      name: string;
    };
  };
};

export async function getEmployees({
  page,
  recordsPerPage,
  sortStatus: { propertyName: sortPropertyName, direction: sortDirection },
}: {
  page: number;
  recordsPerPage: number;
  sortStatus: DataTableSortStatus;
}) {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000 + Math.round(Math.random() * 1000));
  });

  let now: Dayjs;
  if (sortPropertyName === 'age') now = dayjs();

  let result = sortBy(employees, (employee) =>
    sortPropertyName === 'name'
      ? `${employee.firstName} ${employee.lastName}`
      : sortPropertyName === 'age'
      ? now.diff(employee.birthDate)
      : get(employee, sortPropertyName)
  );

  if (sortDirection === 'desc') result.reverse();

  const total = result.length;
  const skip = (page - 1) * recordsPerPage;
  result = result.slice(skip, skip + recordsPerPage);

  return { total, employees: result as unknown as EmployeeData[] };
}
