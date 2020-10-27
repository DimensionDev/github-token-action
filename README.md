# @dimensiondev/github-token-action

This action authenticates npm for consuming
and publishing packages from
and to the GitHub Package Registry.

## Feature Set

- [x] npm registry

## Usage

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: actions/setup-node@v2
  - uses: dimensiondev/github-token-action@latest
  - run: npm install
  - run: npm publish
```

## License

[MIT](LICENSE) &copy; 2020 [@DimensionDev](https://github.com/DimensionDev)
