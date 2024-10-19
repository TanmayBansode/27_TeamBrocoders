[Your Organization] Coding Style Guide
======================================

Table of Contents
-----------------

1. **Programming Language Version**
2. **File Organization**
   - Self-contained Files
   - Header Guards (For languages that support header files)
   - Include What You Use (IWYU)
   - Forward Declarations
   - Names and Order of Includes
3. **Scoping**
   - Namespaces
   - Internal Linkage
   - Global and Static Variables
   - thread_local Variables
4. **Classes and Structs**
   - Constructor Design and Workload
   - Implicit Conversions
   - Copyable and Movable Types
   - Structs vs. Classes
   - Inheritance and Overloading
   - Declaration Order
5. **Functions**
   - Inputs and Outputs
   - Short Function Design
   - Function Overloading and Default Arguments
   - Return Type Best Practices
6. **Organization-Specific Conventions**
   - Ownership and Smart Pointers
   - Custom Linters and Formatters
7. **Other Language Features**
   - Casting Rules
   - Use of `const`, `constexpr`, `constexpr`
   - Integer and Floating-point Types
   - Preprocessor Macros and `nullptr`
   - Type Deduction (Auto, Decltype)
   - Templates, Lambdas, and Metaprogramming
8. **Error Handling**
   - Exception Handling
   - noexcept Guidelines
   - Error Codes and Return Values
9. **Performance Considerations**
   - Use of Inline Functions
   - Preincrement and Predecrement
   - Efficient Memory Usage
10. **Naming Conventions**
    - General Naming Rules
    - File Names
    - Class and Struct Names
    - Variable and Constant Names
    - Function Names
    - Naming Enums and Macros
    - Exceptions to Naming Conventions
11. **Comments**
    - General Comment Guidelines
    - File-Level Comments
    - Class and Function Comments
    - Variable and Implementation Comments
    - TODO Comments
12. **Formatting and Style**
    - Line Length and Breaks
    - Spaces vs. Tabs
    - Function Definitions and Calls
    - Braced Initialization and Control Flow
    - Pointers, References, and Expression Formatting
    - Use of Horizontal and Vertical Whitespace
    - Formatting Constructor Lists and Namespaces
13. **Inclusive Language**
14. **Exceptions to the Rules**
    - Legacy Code
    - Platform-Specific Code
15. **Security and Compliance Standards**
    - Handling Sensitive Information
    - Secure Input/Output
16. **Testing and Documentation**
    - Unit Testing Requirements
    - Documentation Best Practices

---

### 1\. **Programming Language Version**

Specify the minimum required version for your target programming languages (e.g., C++17, Python 3.9, Java 11). Ensure all code adheres to this version unless exceptions are documented.

### 2\. **File Organization**

**Self-contained Files**: Each source file should include all necessary declarations, ensuring minimal dependency.
**Header Guards**: If using header files, employ `#pragma once` or the standard `#define` guard to prevent multiple inclusions.
**Include What You Use**: Only include headers that are directly used in the file. Avoid transitively including headers via other files.
**Forward Declarations**: Use forward declarations when applicable to reduce compile-time dependencies.

### 3\. **Scoping**

**Namespaces**: Organize code into logical namespaces. Follow the convention: `namespace CompanyName::ProjectName`.
**Internal Linkage**: Use `static` for file-local functions and variables to avoid conflicts in global scope.
**Global Variables**: Avoid global variables unless absolutely necessary. Prefer class members or function arguments.
**thread_local Variables**: Use `thread_local` to ensure each thread has its own instance of a variable where applicable.

### 4\. **Classes and Structs**

**Constructor Design**: Avoid doing heavy work in constructors. Delegate complex operations to separate initialization methods.
**Copyable and Movable Types**: Follow the rule of three/five when implementing copy/move constructors and assignment operators.
**Structs vs. Classes**: Use `structs` for passive data holders without behavior, and `classes` for objects with functionality.
**Inheritance**: Avoid deep inheritance trees. Prefer composition over inheritance.
**Operator Overloading**: Overload operators judiciously. Do not overload if it reduces readability.

### 5\. **Functions**

**Short Function Design**: Keep functions short and focused on one task.
**Function Overloading**: Use function overloading sparingly. Prefer default arguments for optional parameters.
**Return Types**: Use descriptive return types and avoid using raw pointers. Prefer smart pointers for dynamic memory management.

### 6\. **Organization-Specific Conventions**

**Ownership and Smart Pointers**: Enforce ownership policies with smart pointers (`std::unique_ptr`, `std::shared_ptr`) for memory management.
**Linters**: Use a customized linter, such as `cpplint` for C++ or `eslint` for JavaScript, with organization-specific configurations.

### 7\. **Other Language Features**

**Casting Rules**: Use C++ casts (`static_cast`, `dynamic_cast`, `const_cast`) over C-style casts.
**Preprocessor Macros**: Limit the use of macros. Prefer `constexpr` for constant expressions.
**Type Deduction**: Use `auto` judiciously to improve readability, especially for complex types.

### 8\. **Error Handling**

**Exception Handling**: Use exceptions for handling errors, avoid returning error codes. Mark functions `noexcept` when possible.
**Error Codes**: Use well-defined error codes or enums in critical systems where exceptions are not used.

### 9\. **Performance Considerations**

**Inline Functions**: Use `inline` for small functions where performance is critical.
**Efficient Memory Usage**: Optimize memory usage in performance-critical paths. Use stack allocations over heap allocations where possible.

### 10\. **Naming Conventions**

**File Names**: Use `snake_case` for filenames (e.g., `my_class.cpp`).
**Class Names**: Use `PascalCase` for class names.
**Variable Names**: Use `snake_case` for variables. Prefix class members with `m_`.
**Function Names**: Use `camelCase` for function names. Avoid starting function names with verbs like `get` unless it's a getter function.

### 11\. **Comments**

**Comment Style**: Use block comments (`/* */`) for long explanations, and line comments (`//`) for short notes.
**Function Comments**: Every function should include a comment explaining its purpose and arguments.
**TODO Comments**: Mark incomplete features with `TODO:` comments, specifying what needs to be done.

### 12\. **Formatting and Style**

**Line Length**: Limit lines to 80 characters.
**Spaces vs. Tabs**: Use 4 spaces for indentation.
**Control Flow Formatting**: Always use braces `{}` with loops and conditionals, even for single statements.
**Horizontal and Vertical Whitespace**: Separate logical sections of code with vertical whitespace.
**Constructor Lists**: Format constructor initializer lists with each initializer on a new line.

### 13\. **Inclusive Language**

Avoid terms that could be offensive or non-inclusive. Prefer terms like **allowlist/blocklist** instead of **whitelist/blacklist**.

### 14\. **Exceptions to the Rules**

Legacy code or third-party libraries may not follow these rules. Be consistent when editing or integrating non-conformant code.

### 15\. **Security and Compliance Standards**

Ensure that all code complies with internal and external security guidelines. Use secure coding patterns for input validation and output encoding.

### 16\. **Testing and Documentation**

**Unit Testing**: Every feature or function must be covered by unit tests.
**Documentation**: Follow the organization's internal documentation standards for maintaining code and architecture documentation.
