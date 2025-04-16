# txt-svg

A command-line tool for converting ASCII `txt` file into an animated SVG.

![demo](./public/demo.svg)

## Install

`txt-svg` should not be added as a dependency to your project, but run as a temporary executable or global CLI tool.

### Global

**With NPM**

```shell
npm -g install txt-svg
```

**With Yarn**

```shell
yarn global add txt-svg
```

**With PNPM**

```shell
pnpm add -g txt-svg
```

### Temporary

**With NPM**

```shell
npx txt-svg -c <.json> -i <.txt> -o <.svg>
```

**With Yarn**

```shell
yarn dlx txt-svg <.json> -i <.txt> -o <.svg>
```

**With PNPM**

```shell
pnpm dlx txt-svg <.json> -i <.txt> -o <.svg>
```

## Usage

`txt-svg` will need three files to be defined as command-line options.

```shell
txt-svg -c <.json> -i <.txt> -o <.svg>
```

**Config (`.json`)**

the configuration file is where you define the tool parameters.

it must respect this form:

```json
{
  "text": {
    "initX": 15,
    "initY": 30,
    "incY": 20,
    "customAttr": "opacity=\"0\""
  },
  "animation": {
    "enabled": true,
    "dur": 0.2,
    "begin": 0,
    "attributeName": "opacity",
    "values": "0;1",
    "fill": "freeze",
    "calcMode": "discrete"
  }
}
```

| property        | description                                         |
| --------------- | --------------------------------------------------- |
| **text**        |                                                     |
| `initX`         | Set `x` value for initial position                  |
| `initY`         | Set `y` value for initial position                  |
| `incY`          | Set increment position `y` of each line             |
| `customAttr`    | Define a custom attribute for each line of `<text>` |
| **animation**   |                                                     |
| `enabled`       | Activate or deactivate animation function           |
| `dur`           | Set animation duration for each `<text>` lines      |
| `begin`         | Define init time before starting animation          |
| `attributeName` | Define the attribute to be animated                 |
| `values`        | Define animated attribute values                    |
| `fill`          | `"freeze"` or not the final position of animation   |
| `calcMode`      | Define interpolation mode for animation             |

> For more information, [visit](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/calcMode).

**Input (`.txt`)**

You can write any text you like this file.

```txt
user@user-linux {#key}~{#} figlet "main"

                         __
                        |  \
 ______ ____    ______   \$$ _______
|      \    \  |      \ |  \|       \
| $$$$$$\$$$$\  \$$$$$$\| $$| $$$$$$$\
| $$ | $$ | $$ /      $$| $$| $$  | $$
| $$ | $$ | $$|  $$$$$$$| $$| $$  | $$
| $$ | $$ | $$ \$$    $$| $$| $$  | $$
 \$$  \$$  \$$  \$$$$$$$ \$$ \$$   \$$

```

> But you can use special tag `{#<name>}` to specify future style rules.

> if you write `{#}`, it will use default style rules.

**Output (`.svg`)**

The output file should contain the basic `<svg>` tag and the special comment (`CONTENT_START` and `CONTENT_END`) to indicate where to add new content.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="985" height="530" font-size="16px">
<!-- you can add custom style here -->
  <style>
    .key {
      fill: green;
    }
  text, tspan {white-space: pre;}
  </style>
<!--CONTENT_START-->
<!--CONTENT_END-->
</svg>
```
