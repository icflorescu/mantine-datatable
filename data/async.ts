import type { DataTableSortStatus } from '__PACKAGE__';
import dayjs, { type Dayjs } from 'dayjs';
import { get, sortBy } from 'lodash';
import { delay, type DelayOptions } from '~/lib/examples';
import { companies, departments, employees, type Employee } from '.';

export async function getCompaniesAsync({
  count,
  delay: delayOptions = { min: 1000, max: 2000 },
}: {
  count: number;
  delay?: DelayOptions;
}) {
  await delay(delayOptions);
  return companies.slice(0, count);
}

export async function getEmployeesAsync({
  page,
  recordsPerPage,
  sortStatus: { columnAccessor: sortAccessor, direction: sortDirection },
  delay: delayOptions = { min: 1000, max: 2000 },
}: {
  page: number;
  recordsPerPage: number;
  sortStatus: DataTableSortStatus<Employee>;
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

export async function countCompanyDepartmentsAsync({
  companyId,
  delay: delayOptions = { min: 1000, max: 2000 },
}: {
  companyId: string;
  delay: DelayOptions;
}) {
  await delay(delayOptions);
  return departments.filter((department) => department.company.id === companyId).length;
}

export async function countCompanyEmployeesAsync({
  companyId,
  delay: delayOptions = { min: 1000, max: 2000 },
}: {
  companyId: string;
  delay: DelayOptions;
}) {
  await delay(delayOptions);
  return employees.filter((employee) => employee.department.company.id === companyId).length;
}
