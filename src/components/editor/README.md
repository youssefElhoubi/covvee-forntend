# Code Editor Workspace

A React-based code editor workspace built with Monaco Editor (the same editor that powers VS Code). This implementation provides a complete code execution environment with real-time output display.

## 📁 Component Structure

```
src/components/editor/
├── CodeEditorWorkspace.tsx  # Main container component
├── EditorPane.tsx           # Monaco editor wrapper
└── OutputPanel.tsx          # Output display and run button

src/components/ui/
└── Button.tsx              # Reusable button component

src/pages/
└── CodeEditorPage.tsx      # Demo page
```

## 🚀 Features

- **Monaco Editor Integration**: Full-featured code editor with syntax highlighting, IntelliSense, and VS Code keybindings
- **Code Execution**: Run JavaScript code directly in the browser
- **Console Output Capture**: Automatically captures and displays `console.log()` output
- **Error Handling**: Catches and displays runtime errors with clear error messages
- **Responsive Layout**: Two-column layout with resizable panels (editor on left, output on right)
- **Dark Theme**: Matches your project's slate/emerald color scheme

## 🛠️ Technology Stack

- **@monaco-editor/react**: Monaco Editor wrapper for React
- **TypeScript**: Type-safe component development
- **Tailwind CSS**: Utility-first styling matching project design system
- **Lucide React**: Icons (Play button)

## 📦 Installation

The Monaco Editor package is already installed:

```bash
npm i @monaco-editor/react
```

## 💻 Usage

### Basic Usage

Import and use the `CodeEditorWorkspace` component in any page:

```tsx
import { CodeEditorWorkspace } from "./components/editor/CodeEditorWorkspace";

function App() {
  return <CodeEditorWorkspace />;
}
```

### With Routing

Add it to your router configuration:

```tsx
import CodeEditorPage from "./pages/CodeEditorPage";

// In your router
<Route path="/editor" element={<CodeEditorPage />} />
```

## 📋 Component Details

### CodeEditorWorkspace.tsx

**Main container component** that orchestrates the entire workspace.

**State Management:**
- `userCode`: Stores the current editor content
- `output`: Stores the execution results or errors

**Key Features:**
- Initializes with default JavaScript code example
- Implements code execution engine with console.log capture
- Error boundary for runtime errors
- Two-column responsive layout

**Props:** None (standalone component)

### EditorPane.tsx

**Monaco Editor wrapper** that provides the code editing interface.

**Props:**
```typescript
interface EditorPaneProps {
  userCode: string;                        // Current code content
  onChange: (value: string | undefined) => void;  // Code change handler
}
```

**Configuration:**
- Language: JavaScript
- Theme: VS Dark
- Font size: 14px
- Minimap: Disabled
- Word wrap: Enabled
- Tab size: 2 spaces

### OutputPanel.tsx

**Output display component** with execution controls.

**Props:**
```typescript
interface OutputPanelProps {
  output: string;      // Output text to display
  onRun: () => void;   // Callback to execute code
}
```

**Features:**
- "Run Code" button with Play icon
- Monospace output display
- Auto-scrolling output area
- Placeholder text when no output exists

### Button.tsx

**Reusable button component** matching project design system.

**Props:**
```typescript
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";  // Button style variant
  children: ReactNode;                           // Button content
}
```

**Variants:**
- `primary`: Emerald background (default)
- `secondary`: Slate background with border
- `danger`: Red background

## 🎨 Design System Integration

All components follow your existing design patterns:

- **Colors**: 
  - Background: `slate-950`
  - Borders: `slate-800`
  - Text: `slate-100`, `slate-300`
  - Accent: `emerald-400`, `emerald-500`
  
- **Typography**: Consistent with existing components
- **Spacing**: Uses Tailwind spacing scale
- **Icons**: Lucide React (matching your existing icon library)

## 🔧 Customization

### Change Default Code

Edit the `DEFAULT_CODE` constant in [CodeEditorWorkspace.tsx](CodeEditorWorkspace.tsx):

```typescript
const DEFAULT_CODE = `// Your custom default code here`;
```

### Change Editor Language

Modify the `defaultLanguage` prop in [EditorPane.tsx](EditorPane.tsx):

```typescript
<Editor
  defaultLanguage="typescript"  // or "python", "java", etc.
  // ...
/>
```

### Adjust Layout Proportions

Update the width classes in [CodeEditorWorkspace.tsx](CodeEditorWorkspace.tsx):

```typescript
// Current: Editor takes remaining space, Output is 40% (400-600px)
<div className="w-[40%] min-w-100 max-w-150">

// Example: 50/50 split
<div className="w-1/2">
```

## 🐛 Code Execution Details

The execution engine works by:

1. Capturing `console.log` calls by temporarily overriding the function
2. Using `eval()` to execute the user's JavaScript code
3. Collecting all console output into a logs array
4. Catching and displaying any runtime errors
5. Restoring the original `console.log` function

**Note:** This uses `eval()` which is disabled by ESLint. This is acceptable for a local code playground but should not be used with untrusted code in production.

## 🚨 Security Considerations

- Code execution happens entirely in the browser
- No server-side execution
- `eval()` is used - do not run untrusted code
- Suitable for learning/playground purposes
- Not recommended for production user-facing features without sandboxing

## 📝 Example Code to Try

Test the editor with this sample code:

```javascript
// Array operations
const numbers = [1, 2, 3, 4, 5];
console.log("Original:", numbers);
console.log("Doubled:", numbers.map(n => n * 2));
console.log("Sum:", numbers.reduce((a, b) => a + b, 0));

// Object manipulation
const user = { name: "Alice", age: 30 };
console.log("User:", JSON.stringify(user, null, 2));
```

## 🔮 Future Enhancements

Potential improvements you could add:

- [ ] Multiple language support (Python, TypeScript, etc.)
- [ ] File tabs for multiple open files
- [ ] Theme switcher (light/dark)
- [ ] Code formatting button
- [ ] Save/load code snippets
- [ ] Keyboard shortcut for running code (Ctrl+Enter)
- [ ] Output panel tabs (Console, Errors, Warnings)
- [ ] Resizable split panels
- [ ] Monaco editor settings panel
- [ ] Code sharing/export functionality

## 📄 License

Part of the Covvee Frontend project.

---

**Created:** March 8, 2026  
**Dependencies:** @monaco-editor/react, React, TypeScript, Tailwind CSS
