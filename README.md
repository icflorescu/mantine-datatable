# Mantine DataTable

![Publish NPM & deploy docs workflow](https://github.com/icflorescu/mantine-datatable/actions/workflows/publish-and-deploy.yml/badge.svg)  
[![NPM version][npm-image]][npm-url]
[![License][license-image]][license-url]
[![Stars][stars-image]][stars-url]
[![Last commit][last-commit-image]][repo-url]
[![Closed issues][closed-issues-image]][closed-issues-url]
[![Downloads][downloads-image]][npm-url]
[![Language][language-image]][repo-url]
[![Sponsor the author][sponsor-image]][sponsor-url]

The lightweight, dependency-free, **dark-theme aware** table component for your Mantine UI data-rich applications, featuring asynchronous data loading support, pagination, intuitive Gmail-style additive batch rows selection, column sorting, custom cell data rendering, row expansion, nesting, context menus, and [much more](https://icflorescu.github.io/mantine-datatable/).

[![Mantine DataTable](https://user-images.githubusercontent.com/581999/279479387-525bb797-cb15-4739-85c6-94ceded94bc1.png)](https://icflorescu.github.io/mantine-datatable/)

**⚠️ Mantine DataTable V7 is compatible with Mantine V7.**  
**💡 If you're looking for the old version that works with [Mantine V6](https://v6.mantine.dev), head over to [Mantine DataTable V6](https://icflorescu.github.io/mantine-datatable-v6).**

## Features

- **Lightweight** - no external dependencies, [no bloat](https://bundlephobia.com/package/mantine-datatable)
- **Dark-theme aware** - automatically adapts to the current [Mantine color scheme](https://mantine.dev/theming/color-schemes/)
- **[Fully customizable](https://icflorescu.github.io/mantine-datatable/examples/overriding-the-default-styles)** - you can customize the look and feel of the table and its components
- **[Asynchronous data loading](https://icflorescu.github.io/mantine-datatable/examples/asynchronous-data-loading)** - load data from a remote API endpoint and show a loading indicator while waiting for the response
- **[Pagination](https://icflorescu.github.io/mantine-datatable/examples/pagination)** - split large data sets into pages
- **[Column sorting](https://icflorescu.github.io/mantine-datatable/examples/sorting)** - sort data by one or more columns
- **[Custom cell data rendering](https://icflorescu.github.io/mantine-datatable/examples/column-properties-and-styling)** - render cell data using custom components
- **[Row context menu](https://icflorescu.github.io/mantine-datatable/examples/using-with-mantine-contextmenu)** - show a context menu when right-clicking on a row
- **[Row expansion](https://icflorescu.github.io/mantine-datatable/examples/expanding-rows)** - expand a row to show additional details
- **[Nesting](https://icflorescu.github.io/mantine-datatable/examples/nested-tables)** - nest tables to show hierarchical data
- **[Additive batch rows selection](https://icflorescu.github.io/mantine-datatable/examples/records-selection)** - select or deselect ranges of rows using the Shift key
- **[Automatically-scrollable](https://icflorescu.github.io/mantine-datatable/examples/scrollable-vs-auto-height)** - automatically scrollable or auto-height
- **[AutoAnimate support](https://icflorescu.github.io/mantine-datatable/examples/using-with-auto-animate)** - animate row sorting, addition and removal
- **[Column dragging and toggling](https://icflorescu.github.io/mantine-datatable/examples/column-dragging-and-toggling)** - drag and drop columns to reorder them, toggle column visibility (thanks to [Giovambattista Fazioli](https://github.com/gfazioli))
- **More** - check out the [full documentation](https://icflorescu.github.io/mantine-datatable/)

## Trusted by the community

Emil Sorensen @ [kapa.ai](https://kapa.ai/):

> _Mantine DataTable is a great component that’s core to our web app - it saves us a ton of time and comes with great styling and features out of the box_

[![Who's using Mantine DataTable](https://user-images.githubusercontent.com/581999/258483859-f8f46b97-5900-4871-8243-c7316fbc244f.png)](https://icflorescu.github.io/mantine-datatable/)

[Mantine DataTable](https://icflorescu.github.io/mantine-datatable/) is used by developers and startups around the world, such as: [kapa.ai](https://kapa.ai/), [exdatis.ai](https://exdatis.ai/), [teachfloor](https://www.teachfloor.com/), [MARKUP](https://www.getmarkup.com/), [BookieBase](https://bookiebase.ie/), [zipline](https://zipline.diced.tech/), [Pachtop](https://github.com/pacholoamit/pachtop), [Ganymede](https://github.com/Zibbp/ganymede), [COH3 Stats](https://coh3stats.com/), [Culver City Rental Registry](https://www.ccrentals.org/) and many more.

If you're using [Mantine DataTable](https://icflorescu.github.io/mantine-datatable/) in your project, please drop me a line at the email address listed in my [GitHub profile](https://github.com/icflorescu) and I'll be happy to add it to the list and on the [documentation website](https://icflorescu.github.io/mantine-datatable/).

## Full documentation and examples

Visit [icflorescu.github.io/mantine-datatable](https://icflorescu.github.io/mantine-datatable/) to view the full documentation and learn how to use it by browsing a comprehensive list of examples.

## Quickstart

Create a new [application with Mantine](https://mantine.dev/getting-started/), make sure to have the `clsx` peer dependency installed,
then install the package with `npm i mantine-datatable` or `yarn add mantine-datatable`.

Import the necessary CSS files:

```ts
import '@mantine/core/styles.layer.css';
import 'mantine-datatable/styles.layer.css';
import './layout.css';
```

Make sure to [apply the styles in the correct order](https://mantine.dev/styles/mantine-styles/):

```css
/* layout.css */
/* 👇 Apply Mantine core styles first, DataTable styles second */
@layer mantine, mantine-datatable;
```

Use the component in your code:

```ts
'use client';

import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';

export function GettingStartedExample() {
  return (
    <DataTable
      withTableBorder
      borderRadius="sm"
      withColumnBorders
      striped
      highlightOnHover
      // 👇 provide data
      records={[
        { id: 1, name: 'Joe Biden', bornIn: 1942, party: 'Democratic' },
        // more records...
      ]}
      // 👇 define columns
      columns={[
        {
          accessor: 'id',
          // 👇 this column has a custom title
          title: '#',
          // 👇 right-align column
          textAlign: 'right',
        },
        { accessor: 'name' },
        {
          accessor: 'party',
          // 👇 this column has custom cell data rendering
          render: ({ party }) => (
            <Box fw={700} c={party === 'Democratic' ? 'blue' : 'red'}>
              {party.slice(0, 3).toUpperCase()}
            </Box>
          ),
        },
        { accessor: 'bornIn' },
      ]}
      // 👇 execute this callback when a row is clicked
      onRowClick={({ record: { name, party, bornIn } }) =>
        showNotification({
          title: `Clicked on ${name}`,
          message: `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`,
          withBorder: true,
        })
      }
    />
  );
}
```

Make sure to browse the comprehensive list of [usage examples](https://icflorescu.github.io/mantine-datatable/examples/basic-usage) to learn how to unleash the full power of Mantine DataTable.

## Other useful resources

Mantine DataTable works perfectly with [Mantine Context Menu](https://icflorescu.github.io/mantine-contextmenu/), a library built by the same author that enables you to enhance your UIs with desktop-grade, lightweight yet fully-featured context menus that respect the Mantine color scheme out of the box:

[![Mantine ContextMenu](https://user-images.githubusercontent.com/581999/279488420-96467a1b-2fb7-4876-bbc0-6976d26ed79b.png)](https://icflorescu.github.io/mantine-contextmenu/)

## Contributing

See the [contributing guide in the documentation website](https://icflorescu.github.io/mantine-datatable/contribute-and-support) or the repo [CONTRIBUTING.md](https://github.com/icflorescu/mantine-datatable/blob/master/CONTRIBUTING.md) file for details.

Here's the list of people who have already contributed to Mantine DataTable:

[![Contributors list](https://contrib.rocks/image?repo=icflorescu/mantine-datatable)](https://github.com/icflorescu/mantine-datatable/graphs/contributors)

Want to [become a code contributor](https://icflorescu.github.io/mantine-datatable/contribute-and-support)?

## Support the project

If you find this package useful, please consider ❤️ [sponsoring my work](https://github.com/sponsors/icflorescu).  
Your sponsorship will help me dedicate more time to maintaining the project and will encourage me to add new features and fix existing bugs.  
If you're a company using Mantine, Mantine DataTable or [Mantine ContextMenu](https://icflorescu.github.io/mantine-contextmenu/) in a commercial project, you can also [hire my services](https://github.com/icflorescu).

## Other means of support

If you can't afford to sponsor the project or hire my services, there are other ways you can support my work:  

- 🙏 star the repository;
- 💕 [tweet about it](http://twitter.com/share?text=Build%20data-rich%20React%20applications%20with%20Mantine%20DataTable&url=https%3A%2F%2Fgithub.com%2Ficflorescu%2Fmantine-datatable&hashtags=mantine%2Cdatatable%2Cdatagrid%2Creact&via=icflorescu);
- 👍 [endorse me on LinkedIn](https://www.linkedin.com/in/icflorescu).

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

🙏 Special thanks to [Ani Ravi](https://github.com/aniravi24) for being the first person to sponsor my work on this project!
💕 Additional thanks to [all sponsors](https://github.com/sponsors/icflorescu)!

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
[sponsor-image]: https://img.shields.io/badge/sponsor-violet?style=flat-square
[sponsor-url]: https://github.com/sponsors/icflorescu
