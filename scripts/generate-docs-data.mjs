import { faker } from '@faker-js/faker';
import lodash from 'lodash';
import { writeFile } from 'node:fs/promises';

const companies = [];
const departments = [];
const employees = [];

for (let i = 0; i < 10; i++) {
  const companyId = faker.datatype.uuid();

  companies.push({
    id: companyId,
    name: faker.company.name(),
    streetAddress: faker.address.streetAddress(),
    city: faker.address.cityName(),
    state: faker.address.stateAbbr(),
    missionStatement: lodash.upperFirst(faker.company.bs()) + '.',
  });

  const departmentCount = faker.datatype.number({ min: 5, max: 15 });
  faker.helpers.uniqueArray(faker.commerce.department, departmentCount).forEach((name) => {
    departments.push({ id: faker.datatype.uuid(), companyId, name });
  });
}

for (let i = 0; i < 500; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  employees.push({
    id: faker.datatype.uuid(),
    firstName,
    lastName,
    email: faker.internet.email(firstName, lastName),
    birthDate: faker.date.birthdate(),
    departmentId: faker.helpers.arrayElement(departments).id,
  });
}

const DATA_FOLDER = './docs/data';
await writeFile(`${DATA_FOLDER}/companies.json`, JSON.stringify(companies, null, 2));
await writeFile(`${DATA_FOLDER}/departments.json`, JSON.stringify(departments, null, 2));
await writeFile(`${DATA_FOLDER}/employees.json`, JSON.stringify(employees, null, 2));
