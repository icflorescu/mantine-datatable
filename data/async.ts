import { delay, type DelayOptions } from '~/lib/examples';
import { companies, departments, employees } from '.';

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

export async function countCompanyDepartmentsAsync({
  companyId,
  delay: delayOptions,
}: {
  companyId: string;
  delay: DelayOptions;
}) {
  await delay(delayOptions);
  return departments.filter((department) => department.company.id === companyId).length;
}

export async function countCompanyEmployeesAsync({
  companyId,
  delay: delayOptions,
}: {
  companyId: string;
  delay: DelayOptions;
}) {
  await delay(delayOptions);
  return employees.filter((employee) => employee.department.company.id === companyId).length;
}
