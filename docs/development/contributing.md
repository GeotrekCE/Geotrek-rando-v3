# Contributing

## Reporting bugs or requesting features

If you encounter any bugs or have suggestions for new features, you can create a ticket in the GitHub issues section. Here's how to proceed:

1. Visit the [issue creation page](https://github.com/GeotrekCE/Geotrek-rando-v3/issues/new).
2. Select the appropriate template for your issue (bug report, feature request, etc.).
3. Provide a clear and detailed description of the issue or the new feature you'd like to see implemented :

	- For bugs: Include steps to reproduce the problem, the expected behavior, and any relevant error messages or logs.
	- For feature requests: Clearly describe the functionality you are proposing and why it would benefit the project.

The development team will review the ticket and follow up with any questions or updates.

## Contributing to Geotrek-rando source code

### Editing the documentation

You can directly modify the documentation files in the repository. They are located in the `/docs` folder. To make changes, you have to clone the repository to your local machine and work on the files, and then create a pull request.
You can access the documentation files for editing files on [/docs](https://github.com/GeotrekCE/Geotrek-rando-v3/tree/main/docs).
Make sure to follow the existing style and structure of the documentation to maintain consistency across the project.

### Translations

As maintainers of this product, we don't have enough native speakers to translate Geotrek Rando correctly.  
If you have a little time to read the [translations files](https://github.com/GeotrekCE/Geotrek-rando-v3/tree/add-readthedocs/frontend/src/translations) and contribute, we'd be very grateful 🙏  
If your language doesn't appear in the list, please don't hesitate to [open an issue](https://github.com/GeotrekCE/Geotrek-rando-v3/issues/new).

### Feature request

- Make a fork of the projet and then install it following the [installation](./installation.md) guide.
- During and after the developement process, you can check your code is correct by using:
	- `yarn lint`
 	- `yarn tsc`
  	- `yarn test`
  	- or `yarn prepush` which concatenates the three commands below
- Write unit test if necessary   
- Ensure that all displayed texts are imported from translation files
- You can run `yarn bundle-analyzer` before and after your modification to ensure that the bundle file doesn't grow excessively.
- And finally, you can open a pull request

## Contributing to Geotrek-rando documentation website

This section explains how to contribute to **the documentation website** of the project. If you are interested in making changes to the codebase or contributing to other aspects of the project, please refer to the relevant sections of the contribution guide.
To contribute to the documentation, it requires **Python 3**. The current version of the documentation has been built using `Python 3.10.12`.

### Running the documentation websire locally

To preview the documentation locally in your environment, follow these steps:

1. Navigate to the `/mkdocs` folder in your project directory.
2. Install the required dependencies by running the following command:
   ```bash
   pip install mkdocs-material
   ```
3. Start the MkDocs server using Python:
   ```bash
   python3 -m mkdocs serve
   ```
4. The local instance of the documentation will be accessible on port 8000 at:  
   [http://127.0.0.1:8000/latest/](http://127.0.0.1:8000/latest/)
