'use client';

import { DataTable } from '__PACKAGE__';
import { employees } from '~/data';

export function MultilevelColumnGroupingExample() {
  return (
    <DataTable
      withTableBorder
      withColumnBorders
      records={employees.slice(0, 10)}
      groups={[
        {
          id: 'personal-info',
          title: 'Personal Information',
          groups: [
            {
              id: 'name-group',
              title: 'Name',
              columns: [
                {
                  accessor: 'firstName',
                  title: 'First Name',
                  width: 120,
                },
                {
                  accessor: 'lastName',
                  title: 'Last Name',
                  width: 120,
                },
              ],
            },
            {
              id: 'demographics',
              title: 'Demographics',
              columns: [
                {
                  accessor: 'sex',
                  title: 'Gender',
                  width: 80,
                },
                {
                  accessor: 'birthDate',
                  title: 'Birth Date',
                  width: 120,
                  render: ({ birthDate }) => new Date(birthDate).toLocaleDateString(),
                },
              ],
            },
          ],
        },
        {
          id: 'contact-info',
          title: 'Contact Information',
          groups: [
            {
              id: 'email-group',
              title: 'Email',
              columns: [
                {
                  accessor: 'email',
                  title: 'Email Address',
                  width: 250,
                  ellipsis: true,
                },
              ],
            },
          ],
        },
        {
          id: 'work-info',
          title: 'Work Information',
          groups: [
            {
              id: 'identifiers',
              title: 'IDs',
              columns: [
                {
                  accessor: 'id',
                  title: 'Employee ID',
                  width: 100,
                  ellipsis: true,
                },
                {
                  accessor: 'department.id',
                  title: 'Department ID',
                  width: 100,
                  ellipsis: true,
                },
              ],
            },
          ],
        },
      ]}
    />
  );
}
