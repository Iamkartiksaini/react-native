# Design Roadmap to Learn React Native for React Developer

> **You already know React. This roadmap bridges the gap to mobile.**
> Estimated time: 8–12 weeks of focused practice (adjustable by pace)

---

## 🧭 How to Read This Roadmap

Each phase builds on the previous. Concepts marked 🔁 will feel familiar from React. Concepts marked 🆕 are truly new mental models you must internalize for mobile. Don't rush past the mental-model shifts — they save hours of debugging later.

---

## Phase 1: The Mental Model Shift (Week 1)

> _"React Native is NOT React for the Web."_

### 🔁 What Transfers Directly

- JSX syntax
- Components, Props, State
- `useEffect`, `useState`, `useContext`, `useRef`
- React 18 Concurrent features (Suspense, Transitions)
- Custom hooks
- Context API / Redux / Zustand

### 🆕 What You Must Unlearn

| Web React           | React Native Equivalent               | Key Difference                         |
| ------------------- | ------------------------------------- | -------------------------------------- |
| `<div>`             | `<View>`                              | No HTML semantics, no DOM              |
| `<span>`, `<p>`     | `<Text>`                              | ALL text must be inside `<Text>`       |
| `<img>`             | `<Image>`                             | Requires fixed width/height            |
| `<input>`           | `<TextInput>`                         | No `onChange`, uses `onChangeText`     |
| `<button>`          | `<TouchableOpacity>` or `<Pressable>` | No native hover states                 |
| `<a>`               | `<Link>` (expo-router)                | Deep linking, not URLs                 |
| CSS classes         | `StyleSheet.create({})`               | Camel-cased, no cascading              |
| Flexbox (row-first) | Flexbox (column-first!)               | **Default flex direction is `column`** |
| `overflow: scroll`  | `<ScrollView>`                        | Must use a component to scroll         |
| `window. *`         | `Dimensions`, `Platform`              | OS-level APIs                          |

### ✅ Milestone

Build a static profile card screen that mirrors a React component you've already built for the web.

---

## Phase 2: The Expo Ecosystem (Week 2)

> _Expo is to React Native what Create-React-App/Vite is to React — but far more powerful._

### Core Concepts

- **Expo SDK**: Pre-built native modules (Camera, Location, Notifications, etc.)
- **Expo Go**: The sandboxed app for rapid development without building
- **EAS (Expo Application Services)**: CI/CD, OTA updates, and app store submissions

### Workflow Choices

| Workflow              | When to Use                                        |
| --------------------- | -------------------------------------------------- |
| **Managed** (default) | You stay in JS/TS land; Expo manages native code   |
| **Bare**              | You need full control over iOS/Android native code |

### 🆕 File-Based Routing with `expo-router`

`expo-router` brings Next.js-style file-based routing to React Native. This is probably the most important tool in modern Expo apps.

```
src/app/
├── _layout.tsx         → Root layout (like _app.tsx in Next.js)
├── index.tsx           → "/" screen (tabs home, etc.)
├── dashboard/
│   ├── _layout.tsx     → Dashboard layout (tabs, drawers)
│   └── index.tsx       → "/dashboard" screen
└── (auth)/
    ├── login.tsx        → "/login" screen
    └── register.tsx     → "/register" screen
```

### Key `expo-router` APIs

```tsx
import { Link, useRouter, useLocalSearchParams } from "expo-router";

// Navigate declaratively
<Link href="/dashboard">Go to Dashboard</Link>;

// Navigate programmatically
const router = useRouter();
router.push("/dashboard");
router.replace("/(auth)/login");

// Route params
const { id } = useLocalSearchParams();
```

### ✅ Milestone

Set up a 3-screen app using `expo-router` with a tab navigator, using `_layout.tsx` files for each section.

---

## Phase 3: Styling & Layout Mastery (Week 3)

> _StyleSheet is not CSS. It's a typed, performant subset of CSS._

### 🔁 Familiar Concepts

- Flexbox layout (same properties, column-first default)
- `padding`, `margin`, `border`, `backgroundColor`
- `zIndex`, `opacity`, `position: absolute/relative`

### 🆕 Key Differences

```tsx
import { StyleSheet, View, Text } from "react-native";

// ✅ Do this — processed once at startup, more performant
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column", // DEFAULT in RN (row in web)
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
});

// 🚫 Avoid inline styles in performance-sensitive lists
// <View style={{ flex: 1 }}> (okay for one-offs, bad in FlatLists)
```

### Responsive Design

```tsx
import { Dimensions, PixelRatio, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
const scale = width / 375; // design at 375pt reference

// Platform-specific styles
const styles = StyleSheet.create({
  shadow: Platform.select({
    ios: { shadowColor: "#000", shadowRadius: 4 },
    android: { elevation: 4 },
  }),
});
```

### UI Component Libraries

| Library                | Best For                                  |
| ---------------------- | ----------------------------------------- |
| **React Native Paper** | Material Design, quick setup              |
| **NativeWind**         | If you love Tailwind CSS                  |
| **Tamagui**            | Performance-first, universal (web+native) |
| **Gluestack UI**       | Accessible, themeable                     |

### ✅ Milestone

Build a responsive UI that looks correct on both small phones and tablets.

---

## Phase 4: Navigation Patterns (Week 4)

> _Navigation in mobile is fundamentally different from the web._

### 🆕 Native Navigation Concepts

Mobile apps use **stacks**, **tabs**, and **drawers** — these are hardware-accelerated, gesture-driven navigators.

```tsx
// expo-router uses file structure to define navigator type

// Stack Navigator → nested folders
app / stack / _layout.tsx; // <Stack />
details.tsx;

// Tab Navigator
app / tabs / _layout.tsx; // <Tabs /> with tab bar
home.tsx;
profile.tsx;

// Drawer Navigator
app / drawer / _layout.tsx; // <Drawer />
settings.tsx;
```

### Passing Data Between Screens

```tsx
// Push with params
router.push({ pathname: "/details", params: { id: "123" } });

// Receive params
const { id } = useLocalSearchParams<{ id: string }>();
```

### Deep Linking

Deep linking allows URLs (or push notifications) to open specific screens. `expo-router` handles this automatically based on your file structure. Add URL scheme in `app.json`:

```json
{
  "expo": {
    "scheme": "myapp"
  }
}
```

`myapp://dashboard` → opens `app/dashboard/index.tsx`

### ✅ Milestone

Build a multi-screen app where you can navigate from a list → detail screen, passing data via route params.

---

## Phase 5: Native APIs & Device Capabilities (Week 5-6)

> _This is where React Native becomes truly special._

### Core APIs Built Into React Native

```tsx
import { Alert, Keyboard, Vibration, AppState, Platform } from "react-native";

// Native alert dialog
Alert.alert("Title", "Message", [
  { text: "Cancel", style: "cancel" },
  { text: "OK", onPress: () => {} },
]);

// Dismiss keyboard on tap
import { TouchableWithoutFeedback } from "react-native";
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <View>...</View>
</TouchableWithoutFeedback>;
```

### Expo SDK Modules (Key Ones)

| Module               | Purpose                          |
| -------------------- | -------------------------------- |
| `expo-camera`        | Camera access + barcode scanning |
| `expo-location`      | GPS coordinates, geocoding       |
| `expo-notifications` | Push notifications               |
| `expo-image-picker`  | Photo library / camera roll      |
| `expo-file-system`   | Read/write files on device       |
| `expo-secure-store`  | Encrypted key-value storage      |
| `expo-haptics`       | Vibration feedback               |
| `expo-av`            | Audio/Video playback             |
| `expo-sensors`       | Accelerometer, gyroscope         |

```tsx
// Example: Image Picker
import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
};
```

### Async Storage (like localStorage for mobile)

```bash
npx expo install @react-native-async-storage/async-storage
```

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

await AsyncStorage.setItem("token", value);
const token = await AsyncStorage.getItem("token");
```

### ✅ Milestone

Build a screen that uses camera or location and persists its data with AsyncStorage.

---

## Phase 6: Performance & Lists (Week 7)

> _Mobile devices have limited RAM. Performance is not optional._

### 🆕 List Rendering: Never use `.map()` for long lists

```tsx
import { FlatList, SectionList } from 'react-native';

// FlatList for flat arrays
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  // Performance props:
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={5}
  initialNumToRender={10}
  getItemLayout={(data, index) => ({   // optimization if fixed height
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
/>

// SectionList for grouped data
<SectionList
  sections={[ { title: 'Today', data: [...] } ]}
  renderItem={({ item }) => <Item />}
  renderSectionHeader={({ section: { title } }) => <Header title={title} />}
/>
```

### Memoization (Even More Critical in RN)

```tsx
// Always memoize renderItem for FlatList
const renderItem = useCallback(({ item }) => <ItemCard item={item} />, []);

// Memoize components that don't need to re-render
const ItemCard = React.memo(({ item }) => <View>...</View>);
```

### Hermes Engine

Hermes is Meta's JavaScript engine optimized for React Native. It's enabled by default:

- Pre-compiles JS to bytecode (faster startup)
- Lower memory footprint
- Built-in debugger

### ✅ Milestone

Render a list of 1000+ items using `FlatList` with stable performance (no jank on scroll).

---

## Phase 7: Animations (Week 8)

> _Animations are what differentiate a good app from a great one._

### Built-in Animated API

```tsx
import { Animated, Easing } from "react-native";

const opacity = useRef(new Animated.Value(0)).current;

Animated.timing(opacity, {
  toValue: 1,
  duration: 300,
  easing: Easing.ease,
  useNativeDriver: true, // ✅ ALWAYS set this for transform/opacity
}).start();

<Animated.View style={{ opacity }}>...</Animated.View>;
```

### 🆕 React Native Reanimated (The Standard)

Reanimated 3 runs animations on the UI thread (not JS thread), making them 60fps+ always.

```bash
npx expo install react-native-reanimated
```

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const scale = useSharedValue(1);
const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

// Trigger animation
scale.value = withSpring(1.2);

<Animated.View style={[styles.box, animatedStyle]} />;
```

### Gesture Handler

```bash
npx expo install react-native-gesture-handler
```

```tsx
import { GestureDetector, Gesture } from "react-native-gesture-handler";

const tap = Gesture.Tap().onEnd(() => {
  scale.value = withSpring(1.5);
});

<GestureDetector gesture={tap}>
  <Animated.View style={animatedStyle} />
</GestureDetector>;
```

### ✅ Milestone

Build an animated button that scales on press and a card that can be swiped to dismiss.

---

## Phase 8: State Management (Week 8-9)

> _What you already know works — choose the right tool._

### 🔁 What Works Exactly as in React

- `useState`, `useReducer`, `useContext`
- **Zustand** (recommended — simple, performant)
- **Redux Toolkit** (if you need it for large apps)
- **Jotai** / **Recoil** (atomic state)
- **TanStack Query** (server state — works great in RN)

### Server State with TanStack Query

```bash
npx expo install @tanstack/react-query
```

```tsx
import { useQuery, useMutation } from "@tanstack/react-query";

const { data, isLoading } = useQuery({
  queryKey: ["todos"],
  queryFn: fetchTodos,
});
```

### ✅ Milestone

Integrate TanStack Query with a public API. Show loading states, error states, and cached data.

---

## Phase 9: The New Architecture (Week 9-10)

> _This is the future of React Native (and it's the default now)._

### 🆕 What Changed

| Old Bridge                        | New Architecture                 |
| --------------------------------- | -------------------------------- |
| Async JSON-serialized messages    | Synchronous C++ via JSI          |
| All native modules loaded eagerly | TurboModules lazy-load           |
| Separate rendering from layout    | Fabric co-locates them           |
| No concurrent rendering           | Full React 18 Concurrent support |

### Key Concepts

**JSI (JavaScript Interface)**  
A C++ object that replaces the old async bridge. JS can now call native methods _synchronously_ and hold references to native objects directly.

**TurboModules**  
New native module system that supports lazy loading and type safety via CodeGen. You don't write them day-to-day but it's what makes libraries faster.

**Fabric**  
The new UI rendering engine. It uses JSI to synchronously communicate between React's shadow tree and native views, enabling concurrent rendering.

### ✅ Milestone

Read the [React Native Blog post on the New Architecture](https://reactnative.dev/blog) and trace how a simple `<View>` renders from your TSX to a native UIView/Android View.

---

## Phase 10: Testing (Week 10)

> _Testing in RN uses the same tools as React — with some native considerations._

### Tools

| Tool                                    | Purpose                               |
| --------------------------------------- | ------------------------------------- |
| **Jest**                                | Unit tests (comes pre-configured)     |
| **React Native Testing Library (RNTL)** | Component tests (like RTL)            |
| **Detox** / **Maestro**                 | E2E testing on real/simulated devices |
| **Expo Doctor**                         | Verify Expo config health             |

```bash
# Run existing tests
npx expo install --check
npx jest

# RNTL
npx expo install @testing-library/react-native
```

```tsx
import { render, screen, fireEvent } from "@testing-library/react-native";

test("button press triggers callback", () => {
  const onPress = jest.fn();
  render(<MyButton onPress={onPress} title="Submit" />);
  fireEvent.press(screen.getByText("Submit"));
  expect(onPress).toHaveBeenCalledTimes(1);
});
```

### ✅ Milestone

Write component tests for 3 key screens using RNTL. Achieve ≥70% component test coverage.

---

## Phase 11: Build & Deploy (Week 11-12)

> _EAS is the gold standard for shipping React Native apps._

### EAS Build

```bash
# Install EAS CLI
npm install -g eas-cli
eas login

# Initialize EAS in your project
eas build:configure

# Build for internal testing (no store)
eas build --profile preview --platform all

# Build for App Store / Google Play
eas build --profile production --platform all
```

### EAS Update (Over-the-Air updates)

Patch JavaScript bugs without going through app store review:

```bash
eas update --branch production --message "Fix critical crash"
```

### App Store Submission

```bash
# Submit to Apple App Store
eas submit --platform ios

# Submit to Google Play
eas submit --platform android
```

### `app.json` Key Config

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "version": "1.0.0",
    "scheme": "myapp",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": { "image": "./assets/splash.png" },
    "ios": {
      "bundleIdentifier": "com.yourname.myapp",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourname.myapp",
      "versionCode": 1
    }
  }
}
```

### ✅ Milestone

Publish an internal preview build with EAS and share it via QR code / link.

---

## 📚 Essential Resources

### Official Docs

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [expo-router Docs](https://expo.github.io/router/docs)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

### Learning

- [The React Native Show Podcast](https://www.callstack.com/podcast)
- [Expo Blog](https://expo.dev/blog)

### Tools & Libraries Reference

| Category       | Library                                     |
| -------------- | ------------------------------------------- |
| Navigation     | `expo-router`                               |
| Animations     | `react-native-reanimated`                   |
| Gestures       | `react-native-gesture-handler`              |
| Server State   | `@tanstack/react-query`                     |
| Client State   | `zustand`                                   |
| Forms          | `react-hook-form` + `zod`                   |
| Icons          | `@expo/vector-icons`                        |
| Images         | `expo-image`                                |
| Storage        | `@react-native-async-storage/async-storage` |
| Auth           | `expo-auth-session`                         |
| Secure Storage | `expo-secure-store`                         |
| Bottom Sheets  | `@gorhom/bottom-sheet`                      |
| Charts         | `victory-native`                           com.yourname.myapp",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourname.myapp",
      "versionCode": 1
    }
  }
}
```

### ✅ Milestone

Publish an internal preview build with EAS and share it via QR code / link.

---

## 📚 Essential Resources

### Official Docs

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Docs](https://docs.expo.dev/)
- [expo-router Docs](https://expo.github.io/router/docs)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)

### Learning

- [The React Native Show Podcast](https://www.callstack.com/podcast)
- [Expo Blog](https://expo.dev/blog)

### Tools & Libraries Reference

| Category | Library |
|---|---|
| Navigation | `expo-router` |
| Animations | `react-native-reanimated` |
| Gestures | `react-native-gesture-handler` |
| Server State | `@tanstack/react-query` |
| Client State | `zustand` |
| Forms | `react-hook-form` + `zod` |
| Icons | `@expo/vector-icons` |
| Images | `expo-image` |
| Storage | `@react-native-async-storage/async-storage` |
| Auth | `expo-auth-session` |
| Secure Storage | `expo-secure-store` |
| Bottom Sheets | `@gorhom/bottom-sheet` |
| Charts | `victory-native` |

---

## 🗺️ Roadmap Summary

```
Phase 1  → Mental Model Shift (1 week)
Phase 2  → Expo Ecosystem + expo-router (1 week)
Phase 3  → Styling & Layout (1 week)
Phase 4  → Navigation Patterns (1 week)
Phase 5  → Native APIs (2 weeks)
Phase 6  → Performance & FlatList (1 week)
Phase 7  → Animations & Gestures (1 week)
Phase 8  → State Management (1 week)
Phase 9  → New Architecture (1 week)
Phase 10 → Testing (1 week)
Phase 11 → Build & Deploy (1-2 weeks)
─────────────────────────
Total    → 11-12 weeks
```

> **Pro tip for React developers**: Phases 1–3 will feel the most jarring — invest extra time there. Phases 7 and 11 are what will make your apps feel truly professional. Everything in between you'll pick up naturally because React already wired your brain the right way. 🚀
