import { delay, type DelayOptions } from '~/lib/examples';
import { departments, employees } from '.';

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
