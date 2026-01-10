# Copilot Instructions for 9898-MTG-Generators

---

# Table of Contents

- [Code Style & Structure](#code-style--structure)
- [Documentation & Comments](#documentation--comments)
- [Configuration & Constants](#configuration--constants)
- [Testing & Quality](#testing--quality)
- [Dependencies](#dependencies)
- [Collaboration & Git](#collaboration--git)
- [Security & Performance](#security--performance)
- [Contributing Guidelines](#contributing-guidelines)

---

## Code Style & Structure

- Use clear, descriptive names for variables, functions, and classes, with terminology relevant to Magic: The Gathering (MTG) and RPG generators.
- Structure code into modular, reusable components. Each generator or utility must be self-contained.
- Strictly follow the project's established code style, formatting, and file organization.
- Eliminate code duplication by refactoring shared logic into common modules or utilities.
- Prioritize clean code principles: readability, simplicity, and maintainability.
- Apply type hints where possible to enhance code clarity and enable static analysis.

---

## Documentation & Comments

- Write concise, well-documented code. Add comments for complex logic, algorithms, or non-obvious decisions.
- Document all public functions, classes, and modules using docstrings or comments.
- Update or add to the project’s documentation (e.g., README, usage guides) when introducing new features or changes.
- Use examples in documentation to illustrate how to use generators and utilities.
- Maintain a consistent style for comments and documentation throughout the codebase.
- Avoid redundant comments that do not add value or explain the code.
- Use proper grammar and spelling in all comments and documentation.

---

## Configuration & Constants

- Never hardcode values. Use configuration files, environment variables, or constants as appropriate.
- Store sensitive or environment-specific data outside the codebase.
- Group related constants together and use descriptive, consistent names.
- Document the purpose and usage of all configuration options and constants.
- Ensure configuration files are easy to read, modify, and validate values to prevent runtime errors.
- Provide default configurations that users can override.
- Use standard formats (e.g., JSON, YAML) for configuration files when applicable.
- Keep configuration files organized, well-structured, and free of sensitive information.
- Include comments in configuration files to explain non-obvious settings.
- Ensure configuration files are version controlled, excluding sensitive data.
- Provide example configuration files in the documentation.
- Avoid duplication of configuration values across files or modules.
- Document any changes to configuration options in the project documentation.
- Support environment-specific configurations (e.g., development, production) as needed.
- Use configuration management libraries for complex configurations.

---

## Testing & Quality

- Ensure all new code is testable. Add or update unit tests for new features, bug fixes, or changes.
- Prefer test-driven development (TDD) when possible.
- Run all tests and ensure they pass before submitting changes.
- Use code linters and formatters to maintain code quality and consistency.
- Aim for high code coverage, especially for critical components.
- Document test cases and scenarios for complex logic.
- Regularly review and refactor tests to keep them relevant and effective.
- Use mocking and stubbing to isolate units under test.
- Automate testing processes using CI/CD pipelines where applicable.
- Avoid flaky tests; ensure tests produce consistent results.
- Keep tests independent; avoid dependencies between test cases.
- Name test functions and classes clearly to reflect their purpose.
- Organize tests in a structured manner, mirroring the project structure.
- Use descriptive assertions to improve test readability.
- Regularly review test coverage reports to identify untested code paths.
- Incorporate performance tests for critical components where applicable.
- Ensure tests are easy to run and maintain.
- Document any changes to testing procedures in the project documentation.
- Use version control for test data and fixtures.
- Integrate testing tools and frameworks that align with the project's technology stack.
- Encourage peer reviews of test code to ensure quality and effectiveness.
- Continuously improve test cases based on feedback and evolving project requirements.

---

## Dependencies

- Manage dependencies using the appropriate package manager (e.g., npm, pip).
- Keep dependencies up to date, ensuring compatibility with existing code.
- Document any new dependencies added to the project and their purpose.
- Only add dependencies when necessary. Prefer lightweight, well-maintained, and widely-used packages.
- Update dependency documentation and lock files as needed.
- Regularly audit dependencies for security vulnerabilities.
- Avoid deprecated or unmaintained libraries.
- Pin dependency versions to ensure consistent builds.
- Test the project after updating dependencies to catch compatibility issues.
- Use dependency management tools to automate updates and checks.
- Maintain a list of approved dependencies for the project.
- Use virtual environments or containers to isolate project dependencies.
- Regularly clean up unused dependencies.
- Monitor dependency licenses for compliance.
- Automate dependency checks in CI/CD pipelines.
- Test the project in different environments to ensure compatibility.
- Avoid introducing breaking changes when updating dependencies.
- Consider long-term maintenance when adding new dependencies.

---

## Collaboration & Git

- Write clear, descriptive commit messages summarizing the changes.
- Group related changes into a single commit or pull request.
- Do not include unrelated features or code outside the scope of MTG or RPG generators.
- Use English for all code, comments, documentation, and commit messages.

---

## Security & Performance

- Validate and sanitize all user input.
- Optimize for performance where relevant, but prioritize readability and maintainability.
- Avoid introducing security vulnerabilities or exposing sensitive data.

---

# Contributing Guidelines

We welcome contributions to the `9898-MTG-Generators` project! To ensure a smooth collaboration process, please follow these steps:

1. **Fork the Repository**: Fork `9898-MTG-Generators` to your own GitHub account.
2. **Create a Feature Branch**: Use a descriptive branch name (e.g., `feature/add-new-generator`, `bugfix/fix-typo`).
3. **Make Changes**: Implement your changes following the coding standards and guidelines above.
4. **Test Your Changes**: Add or update unit tests and run all tests to confirm nothing is broken.
5. **Commit Changes**: Write clear, concise commit messages. Use the conventional commit format if possible.
6. **Submit a Pull Request**: Provide a detailed description and relevant context for your changes.
7. **Code Review**: Address feedback and requested changes promptly.
8. **Stay Updated**: Keep your fork and branches up to date with the main repository.
9. **Respect the Community**: Maintain a respectful and collaborative attitude.

By following these guidelines, you help maintain the quality, reliability, and coherence of the `9898-MTG-Generators` project.

Thank you for contributing!
