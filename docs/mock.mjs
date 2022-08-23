import { faker } from '@faker-js/faker';
import { writeFile } from 'fs/promises';

const companies = [];
for (let i = 0; i < 10; i++) {
  companies.push({
    id: faker.datatype.uuid(),
    name: faker.company.name(),
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

writeFile('data.json', JSON.stringify({ companies, departments, employees }, null, 2));
