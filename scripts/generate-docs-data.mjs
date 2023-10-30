import { faker } from '@faker-js/faker';
import lodash from 'lodash';
import { writeFile } from 'node:fs/promises';

const companies = [];
const departments = [];
const employees = [];

for (let i = 0; i < 10; i++) {
  const companyId = faker.string.uuid();

  companies.push({
    id: companyId,
    name: faker.company.name(),
    streetAddress: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    missionStatement: lodash.upperFirst(faker.company.buzzPhrase()) + '.',
  });

  const departmentCount = faker.number.int({ min: 5, max: 15 });
  faker.helpers.uniqueArray(faker.commerce.department, departmentCount).forEach((name) => {
    departments.push({ id: faker.string.uuid(), companyId, name });
  });
}

for (let i = 0; i < 500; i++) {
  const sex = faker.person.sex();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName(sex);
  employees.push({
    id: faker.string.uuid(),
    sex,
    firstName,
    lastName,
    email: faker.internet.email({ firstName, lastName }),
    birthDate: faker.date.birthdate(),
    departmentId: faker.helpers.arrayElement(departments).id,
  });
}

const DATA_FOLDER = new URL('.', import.meta.url).pathname + '/../data';
await writeFile(`${DATA_FOLDER}/companies.json`, JSON.stringify(companies, null, 2));
await writeFile(`${DATA_FOLDER}/departments.json`, JSON.stringify(departments, null, 2));
await writeFile(`${DATA_FOLDER}/employees.json`, JSON.stringify(employees, null, 2));
