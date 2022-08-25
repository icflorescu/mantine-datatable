import { faker } from '@faker-js/faker';
import { writeFile } from 'node:fs/promises';

const companies = [];
for (let i = 0; i < 10; i++) {
  companies.push({
    id: faker.datatype.uuid(),
    name: faker.company.name(),
    streetAddress: faker.address.streetAddress(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr(),
  });
}

const departments = [];
for (let i = 0; i < 100; i++) {
  departments.push({
    id: faker.datatype.uuid(),
    companyId: companies[faker.datatype.number({ max: 9 })].id,
    name: faker.commerce.department(),
  });
}

const employees = [];
for (let i = 0; i < 500; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  employees.push({
    id: faker.datatype.uuid(),
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName),
    birthDate: faker.date.birthdate(),
    departmentId: departments[faker.datatype.number({ max: 99 })].id,
  });
}

await writeFile('data/companies.json', JSON.stringify(companies, null, 2));
await writeFile('data/departments.json', JSON.stringify(departments, null, 2));
await writeFile('data/employees.json', JSON.stringify(employees, null, 2));
