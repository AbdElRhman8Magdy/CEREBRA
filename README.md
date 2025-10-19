# CEREBRA Test Automation Framework

An automated testing framework built with Playwright and TypeScript for CEREBRA application.

## 🚀 Features

- Page Object Model (POM) design pattern
- TypeScript for better type safety and IDE support
- User state management with cookie persistence
- Reusable WebActions utility class
- Modular test organization by feature
- Data-driven testing capabilities
- Test reporting with Playwright HTML reporter

## 📁 Project Structure

```
CEREBRA/
├── lib/
│   └── WebActions.ts      # Shared utilities and helper functions
├── Pages/
│   ├── Dashboard.page.ts  # Dashboard page object
│   ├── Departments.page.ts# Departments page object
│   ├── Groups.page.ts     # Groups page object
│   ├── Login.page.ts      # Login page object
│   └── Users.page.ts      # Users page object
├── test-data/
│   ├── LoginData.ts       # Login test data
│   ├── User.ts           # User model
│   ├── saved-user.json   # Persisted user data
│   └── userStore.ts      # User data persistence utilities
├── tests/
│   ├── 1-Login.spec.ts   # Login test cases
│   ├── 2-Groups.spec.ts  # Groups management tests
│   ├── 3-Users.spec.ts   # User management tests
│   └── 4-Departments.spec.ts # Department management tests
└── playwright.config.ts   # Playwright configuration
```

## 🛠️ Setup

1. Install dependencies:
```bash
npx playwright install --with-deps
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## 🧪 Running Tests

Run all tests:
```bash
npx playwright test
```

Run specific test file:
```bash
npx playwright test tests/1-Login.spec.ts
```

Run tests with UI mode:
```bash
npx playwright test --ui
```

Run tests in headed mode:
```bash
npx playwright test --headed
```

## 🎯 Test Groups

- **Login Tests** (`@Login`): Authentication and session management
- **Groups Tests**: Group creation, editing, and deletion
- **Users Tests**: User management workflows
- **Departments Tests**: Department administration

## 📝 Key Features Implementation

### State Management
- User authentication state is persisted using cookies
- Implements `loginWithSavedState()` for efficient test runs

### Page Objects
Each page object (`*.page.ts`) contains:
- Locators for UI elements
- Methods for page-specific actions
- Validation and assertion helpers

### WebActions Utility
Provides reusable methods for:
- Element interactions (click, type, select)
- Wait conditions and timeouts
- Form handling and validation

### Data Management
- User data generation with Faker
- JSON persistence for created entities
- Type-safe data models

## 🔍 Best Practices

1. **Page Objects**:
   - Keep locators private
   - Use meaningful method names
   - Include validation in critical flows

2. **Test Structure**:
   - Use `beforeAll` for one-time setup
   - Clean state between tests
   - Group related test cases

3. **Data Management**:
   - Use fresh data for each test
   - Clean up created data
   - Avoid test interdependencies

## 📊 Reporting

Test results are available in:
- HTML report: `playwright-report/index.html`
- Test traces: `test-results/`

## 🤝 Contributing

1. Follow the existing code style
2. Add comments for complex logic
3. Update tests for new features
4. Update documentation as needed

