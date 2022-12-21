# Mantine DataTable

[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Stars][stars-image]][stars-url]
[![Last commit][last-commit-image]][repo-url]
[![Closed issues][closed-issues-image]][closed-issues-url]
[![Downloads][downloads-image]][npm-url]
[![Language][language-image]][repo-url]

A "dark-theme aware" **table component** for your Mantine UI data-rich applications, featuring asynchronous data loading support, pagination, multiple rows selection, column sorting, custom cell data rendering, row context menu, row expansion, and more.

[![Mantine DataTable](https://user-images.githubusercontent.com/581999/189911698-369ba48e-65f0-4772-aad3-cb5e6d4cb59d.png)](https://icflorescu.github.io/mantine-datatable/)

## Full documentation and examples

Visit [icflorescu.github.io/mantine-datatable](https://icflorescu.github.io/mantine-datatable/) to view the full documentation and learn how to use it by browsing a comprehensive list of examples.

## Quickstart

Install the package and its dependencies:

```sh
npm i @mantine/core @mantine/hooks @emotion/react mantine-datatable
```

Use it in your code:

```ts
import { Text } from '@mantine/core';
import { DataTable } from 'mantine-datatable';

export default function GettingStartedExample() {
  return (
    <DataTable
      withBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      // provide data
      records={[
        { id: 1, name: 'Joe Biden', bornIn: 1942, party: 'Democratic' },
        // more records...
      ]}
      // define columns
      columns={[
        {
          accessor: 'id',
          // this column has a custom title
          title: '#',
          // right-align column
          textAlignment: 'right',
        },
        { accessor: 'name' },
        {
          accessor: 'party',
          // this column has custom cell data rendering
          render: ({ party }) => (
            <Text weight={700} color={party === 'Democratic' ? 'blue' : 'red'}>
              {party.slice(0, 3).toUpperCase()}
            </Text>
          ),
        },
        { accessor: 'bornIn' },
      ]}
      // execute this callback when a row is clicked
      onRowClick={({ name, party, bornIn }) =>
        alert(`You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}.`)
      }
    />
  );
}
```
Have a look at the available [component properties](https://icflorescu.github.io/mantine-datatable/component-properties) and make sure to browse the comprehensive list of [usage examples](https://icflorescu.github.io/mantine-datatable/examples/basic-usage).

## Code contributors

[![Contributors list](https://contrib.rocks/image?repo=icflorescu/mantine-datatable)](https://github.com/icflorescu/mantine-datatable/graphs/contributors)

Want to [become a code contributor](https://icflorescu.github.io/mantine-datatable/contribute-and-support)?

## Sponsor the project

If you find this package useful, please consider ❤️[sponsoring my work](https://github.com/sponsors/icflorescu). Your sponsorship will help me dedicate more time to maintaining the project and will encourage me to add new features and fix existing bugs. If you're a company using Mantine DataTable in a commercial project, you can also [hire my services](https://github.com/icflorescu).

## Other means of support

If you find this package useful, please 🙏star the repository, 💕[tweet about it](http://twitter.com/share?text=Build%20data-rich%20React%20applications%20with%20Mantine%20DataTable&url=https%3A%2F%2Fgithub.com%2Ficflorescu%2Fmantine-datatable&hashtags=mantine%2Cdatatable%2Cdatagrid%2Creact&via=icflorescu), 👍[endorse me on LinkedIn](https://www.linkedin.com/in/icflorescu) or consider hiring my services.

The more stars this repository gets, the more visibility it gains among the Mantine users community. The more
users it gets, the more chances that some of those users will become active code contributors willing to put
their effort into bringing new features to life and/or fixing bugs.

As the repository gain awareness, my chances of getting hired to work on Mantine-based projects will increase,
which in turn will help maintain my vested interest in keeping the project alive.

## Hiring the author

If you want to hire my services, don’t hesitate to drop me a line at the email address listed in my [GitHub profile](https://github.com/icflorescu).
I’m currently getting a constant flow of approaches, some of them relevant, others not so relevant.
Mentioning “Mantine DataTable” in your text would help me prioritize your message.

## Acknowledgements

🙏Special thanks to [Ani Ravi](https://github.com/aniravi24) for being the first person to sponsor my work on this project!

## License

The [MIT License](https://github.com/icflorescu/mantine-datatable/blob/master/LICENSE).

[npm-url]: https://npmjs.org/package/mantine-datatable
[repo-url]: https://github.com/icflorescu/mantine-datatable
[stars-url]: https://github.com/icflorescu/mantine-datatable/stargazers
[closed-issues-url]: https://github.com/icflorescu/mantine-datatable/issues?q=is%3Aissue+is%3Aclosed
[license-url]: LICENSE
[npm-image]: https://img.shields.io/npm/v/mantine-datatable.svg?style=flat-square
[license-image]: http://img.shields.io/npm/l/mantine-datatable.svg?style=flat-square
[downloads-image]: http://img.shields.io/npm/dm/mantine-datatable.svg?style=flat-square
[stars-image]: https://img.shields.io/github/stars/icflorescu/mantine-datatable?style=flat-square
[last-commit-image]: https://img.shields.io/github/last-commit/icflorescu/mantine-datatable?style=flat-square
[closed-issues-image]: https://img.shields.io/github/issues-closed-raw/icflorescu/mantine-datatable?style=flat-square
[language-image]: https://img.shields.io/github/languages/top/icflorescu/mantine-datatable?style=flat-square
