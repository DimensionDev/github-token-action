# automatic-github-token

This action authenticates npm for consuming
and publishing packages from
and to the GitHub Package Registry.

## Feature Set

- [x] npm registry
- [ ] rubygem registry
- [ ] nuget registry
- [ ] maven registry

## Usage

```yaml
steps:
  - uses: actions/checkout@v1
  - uses: actions/setup-node@v1
  - uses: NiceLabs/automatic-github-token@v1
  - run: npm install
  - run: npm publish
```

## License

[MIT](LICENSE) &copy; 2020 Septs
