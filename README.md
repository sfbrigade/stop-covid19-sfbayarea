# Stop Coronavirus in the Bay Area website

This site was derived from [Tokyo COVID-19 Task Force website](https://github.com/tokyo-metropolitan-gov/covid19) for stopping Coronavirus for the Bay Area communities.

## How to Contribute

All contributions are welcome!
Please check [How to contribute](./.github/CONTRIBUTING.md) for details.

## Code of Conduct

Please check [Code of conduct for developers](./.github/CODE_OF_CONDUCT.md) for details.

## License
This software is released under [the MIT License](./LICENSE.txt).

## For Developers

### How to Set Up Environments

- Required Node.js version: 10.19.0 or higher

**Use yarn**
``` bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev
```

**Use docker**
```bash
# serve with hot reload at localhost:3000
$ docker-compose up --build
```

### Deployment to Staging & Production Environments

When `master` branch is updated, the files will be automatically deployed onto the production site (https://panda.baybrigades.org/).