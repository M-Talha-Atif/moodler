I WRITE: <SearchBar placeholder="test" />
    ↓
TYPESCRIPT: Checks types (placeholder should be string)
    ↓  
COMPILATION: Removes TypeScript, keeps JavaScript
    ↓
REACT NATIVE: Creates element { type: SearchBar, props: {placeholder: "test"} }
    ↓
REACT: Calls SearchBar({placeholder: "test"})
    ↓
MY CODE: Function executes, returns React elements
    ↓
REACT NATIVE: Converts to native iOS/Android views

-----
Great question! Since you know Java, let me explain TypeScript types/interfaces using Java analogies, then show what happens under the hood.

## **1. Interface vs Type - The Java Comparison**

### **Interface in TypeScript (Similar to Java):**
```typescript
// TypeScript Interface
interface Person {
  name: string;
  age: number;
  speak(): void;
}

// Java Interface (for comparison)
interface Person {
  String name;
  int age;
  void speak();
}
```

### **Key Similarities:**
- Both define contracts
- Both support methods/functions
- Both can be implemented

### **Key Differences:**
```typescript
// TypeScript allows this (Java doesn't):
interface Person {
  name: string;
}

const john: Person = { name: "John" }; // Can use interface for objects directly
```

## **2. What are `type` and `interface` REALLY?**

### **They are BOTH Type Annotations (NOT values):**
```typescript
// These are equivalent at runtime:
interface Person { name: string; }
type Person = { name: string; }

// Both COMPLETELY disappear after compilation!
```

### **Compilation Process:**
```typescript
// INPUT (.tsx)
interface Props { title: string; }
type Color = "red" | "blue";
const Component: React.FC<Props> = () => null;

// OUTPUT (.js)
const Component = () => null; // Everything else GONE!
```

## **3. Under the Hood - Memory & Execution**

### **What TypeScript Does:**
```typescript
// During COMPILATION only:
interface ButtonProps {
  title: string;
  onPress?: () => void;
}

// TypeScript creates an INTERNAL type map:
// "ButtonProps" → { title: string, onPress?: Function }
```

### **What JavaScript Sees:**
```javascript
// At RUNTIME - no types exist!
const Button = (props) => {
  // props is just a plain JavaScript object
  return React.createElement(...);
}
```

## **4. OOP Features They Provide**

### **Interface OOP Features:**
```typescript
// 1. Implementation (like Java)
interface Animal {
  speak(): void;
}

class Dog implements Animal {
  speak() { console.log("Woof!"); }
}

// 2. Extends (Inheritance)
interface Vehicle {
  wheels: number;
}

interface Car extends Vehicle {
  doors: number;
}

// 3. Multiple Interfaces
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }

class Duck implements Flyable, Swimmable {
  fly() { /* ... */ }
  swim() { /* ... */ }
}
```

### **Type OOP Features:**
```typescript
// 1. Union Types (Java can't do this)
type Status = "loading" | "success" | "error";

// 2. Intersection Types (Multiple inheritance for types)
type Flyable = { fly(): void };
type Swimmable = { swim(): void };
type Duck = Flyable & Swimmable;

// 3. Conditional Types
type IsString<T> = T extends string ? true : false;
```

## **5. Key Differences Interface vs Type**

### **Interface CAN:**
- Be extended (`interface B extends A`)
- Be implemented (`class implements interface`)
- Be merged (declaration merging)

### **Type CAN:**
- Union types (`A | B`)
- Intersection types (`A & B`)
- Mapped types
- Conditional types

### **Declaration Merging (Interface Only):**
```typescript
interface User { name: string; }
interface User { age: number; }
// Result: User = { name: string; age: number; }

type User = { name: string; }
type User = { age: number; } // ❌ Error - can't redeclare
```

## **6. Complete Compilation Process**

### **Step 1: TypeScript Source**
```typescript
// App.tsx
interface Props { title: string; }
type Theme = "light" | "dark";

const App: React.FC<Props> = ({ title }) => {
  const [theme, setTheme] = useState<Theme>("light");
  return <Text>{title}</Text>;
}
```

### **Step 2: TypeScript Compiler Work**
```javascript
// TypeScript's INTERNAL representation:
// - Creates symbol table: 
//   Props → {title: string}
//   Theme → "light" | "dark"
//   App → React.FC<Props>

// - Validates all type usage
// - Removes ALL type annotations
```

### **Step 3: JavaScript Output**
```javascript
// App.js (what actually runs)
const App = ({ title }) => {
  const [theme, setTheme] = useState("light");
  return React.createElement(Text, null, title);
};
```

## **7. Memory Allocation - What Actually Exists**

### **At Runtime:**
```
HEAP MEMORY:
┌─────────────────────┐
│ App function        │ ← Your component as JavaScript function
├─────────────────────┤
│ props object        │ ← { title: "Hello" } (if passed)
├─────────────────────┤
│ useState closure    │ ← React's internal state management
├─────────────────────┤
│ React elements      │ ← The returned JSX as objects
└─────────────────────┘

STACK MEMORY (during execution):
┌─────────────────────┐
│ App() call frame    │
│ - title = "Hello"   │ ← Parameter variable
│ - theme = "light"   │ ← Local variable  
│ - setTheme function │ ← Local variable
└─────────────────────┘
```

**NOTICE:** No interfaces, no types, no React.FC in memory!

## **8. React.FC Deep Dive**

### **What is React.FC?**
```typescript
// It's just a TYPE definition:
type FC<P = {}> = (props: P) => ReactElement | null;

// So this:
const Button: React.FC<ButtonProps> = (props) => { }

// Means: "Button is a function that takes ButtonProps and returns ReactElement"
```

### **Why Use It?**
```typescript
// Without React.FC:
const Button = (props: ButtonProps) => { }
// Can return any value

// With React.FC:
const Button: React.FC<ButtonProps> = (props) => { }
// TypeScript ensures it returns ReactElement | null
```

## **9. Java vs TypeScript Type System**

### **Java (Runtime Types):**
```java
// Java types exist at RUNTIME
interface Person { } // Exists in JVM
class Student implements Person { } // Exists in JVM

// You can do reflection:
Person.class.getName() // Works!
```

### **TypeScript (Compile-time Only):**
```typescript
// TypeScript types DON'T exist at runtime
interface Person { } // Disappears!
type Student = Person // Disappears!

// You CANNOT do:
typeof Person // ❌ Person doesn't exist at runtime!
```

## **Simple Explanation:**

"**TypeScript interfaces/types are like instructions that get thrown away after the code is built. They help you write correct code but don't exist when the app actually runs on your phone.**"

"**Java interfaces are like real contracts that exist even when your program is running. TypeScript interfaces are just notes for the developer that disappear after compilation.**"

------
Excellent question! Let me break this down clearly.

## **1. Final JavaScript Output - What Remains?**

**YES! Everything becomes plain JavaScript objects/functions:**

```typescript
// TypeScript INPUT
interface Props { title: string; }
type Theme = "light" | "dark";

const Component: React.FC<Props> = ({ title }) => {
  return <div>{title}</div>;
}
```

```javascript
// JavaScript OUTPUT (what actually runs)
const Component = ({ title }) => {
  return React.createElement("div", null, title);
};
```

**Everything GONE:**
- ❌ `interface Props` 
- ❌ `type Theme`
- ❌ `React.FC<Props>`
- ❌ All type annotations

## **2. Inheritance Types Supported**

### **Interface Inheritance:**
```typescript
// Single Inheritance
interface Animal {
  eat(): void;
}

interface Dog extends Animal {
  bark(): void;
}

// Multiple Inheritance
interface Flyable { fly(): void; }
interface Swimmable { swim(): void; }

class Duck implements Flyable, Swimmable {
  fly() { console.log("Flying"); }
  swim() { console.log("Swimming"); }
}
```

### **Type Inheritance (via Intersection):**
```typescript
type Animal = { eat(): void };
type Dog = Animal & { 
  bark(): void 
};

type Flyable = { fly(): void };
type Swimmable = { swim(): void };
type Duck = Flyable & Swimmable;
```

## **3. The Diamond Problem - CAN IT HAPPEN?**

**YES! Diamond problem can occur in TypeScript:**

### **Diamond Problem Scenario:**
```typescript
interface Animal {
  move(): void;
}

interface Flyable extends Animal {
  move(): void;  // Override
}

interface Swimmable extends Animal {
  move(): void;  // Override
}

// 💎 DIAMOND PROBLEM HERE:
class Duck implements Flyable, Swimmable {
  move() { 
    // Which move() should I implement?
    // Flyable.move() or Swimmable.move()?
  }
}
```

## **4. How TypeScript Resolves Diamond Problem**

### **Case 1: Same Method Signature - NO PROBLEM**
```typescript
interface A { method(): void; }
interface B { method(): void; }

class C implements A, B {
  method() { 
    // Only ONE implementation needed
    // Since signatures are identical
  }
}
```

### **Case 2: Conflicting Signatures - COMPILATION ERROR**
```typescript
interface A { method(x: string): void; }
interface B { method(x: number): void; }

class C implements A, B { // ❌ ERROR!
  // Cannot implement - conflicting signatures
  // method(x: string | number) { } // This won't work either
}
```

### **Case 3: Property Name Conflict**
```typescript
interface A { name: string; }
interface B { name: number; } // Different type!

type C = A & B; 
// name: string & number → never ❌
// This becomes impossible type
```

## **5. Real Diamond Problem Example & Solutions**

### **Problem:**
```typescript
interface Organism {
  live(): void;
}

interface Animal extends Organism {
  live(): void;  // Override with animal behavior
}

interface Plant extends Organism {
  live(): void;  // Override with plant behavior  
}

// 💎 DIAMOND: Which live() to implement?
class VenusFlyTrap implements Animal, Plant {
  live() {
    // Am I Animal.live() or Plant.live()?
    // TypeScript forces you to choose ONE implementation
  }
}
```

### **Solution 1: Explicit Implementation**
```typescript
class VenusFlyTrap implements Animal, Plant {
  live() {
    // You decide the behavior
    this.animalBehavior();
    this.plantBehavior();
  }
  
  private animalBehavior() { /* ... */ }
  private plantBehavior() { /* ... */ }
}
```

### **Solution 2: Composition Over Inheritance**
```typescript
class VenusFlyTrap {
  private animal: Animal;
  private plant: Plant;
  
  live() {
    this.animal.live();
    this.plant.live();
  }
}
```

## **6. Type Intersection Diamond Problem**

```typescript
type A = { value: number };
type B = { value: string }; 

type C = A & B;
// value: number & string → never ❌
// This type is IMPOSSIBLE to create
```

## **7. Key Resolution Rules**

### **TypeScript's Approach:**
1. **Same signatures** → One implementation works for all
2. **Different signatures** → Compilation error
3. **Properties with different types** → Becomes `never` type
4. **Developer must resolve** ambiguity explicitly

### **Unlike Java/C++:**
- No virtual inheritance
- No super calls to specific parents
- Compiler errors force explicit resolution

## **8. Memory Perspective - What Actually Exists**

### **After Compilation:**
```typescript
// TypeScript
class Duck implements Flyable, Swimmable {
  move() { console.log("Moving"); }
}
```

```javascript
// JavaScript (runtime)
class Duck {
  move() { console.log("Moving"); }
}
// No trace of Flyable, Swimmable interfaces!
```

### **Memory Allocation:**
```
HEAP:
┌─────────────┐
│ Duck class  │ ← Only the actual class exists
│ - move()    │
└─────────────┘

STACK (when method called):
┌─────────────┐
│ Duck.move() │ ← Just one method implementation
└─────────────┘
```

## **9. Summary - Diamond Problem in TypeScript**

### **Can it happen?** ✅ YES
### **When?** Multiple inheritance with conflicting members
### **How resolved?** 
- Same signatures → Single implementation
- Different signatures → Compilation error
- Developer must explicitly resolve conflicts

### **Key Difference from Java/C++:**
- **TypeScript**: Compile-time errors force explicit resolution
- **Java/C++**: Runtime resolution with virtual inheritance

**Bottom Line:** TypeScript prevents ambiguous diamond problems at compile time rather than resolving them at runtime!