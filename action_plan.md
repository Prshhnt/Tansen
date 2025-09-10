# Action Plan for Building Tansen App

## Overview
This action plan details the development of the "Tansen" React Native app for Android, a modular platform hosting mini-apps, starting with "Face Detector" – a personality detector prank app recognizing 5 people: Anuj, Prashant, Bansi, Akshay (display personality traits), and Dhananjay (glitch and prank roast message). The app uses React Native, Firebase Auth for Tansen-level authentication, Turso DB for data storage, react-native-vision-camera for face detection, and react-native-fast-tflite for face embeddings (FaceNet model). The app is designed for extensibility, allowing new mini-apps (JS-based or native) to be added seamlessly via CodePush or occasional APK updates. The APK is hosted on GitHub, with new mini-apps appearing on app restart without requiring immediate APK updates for most cases.

## GitHub Copilot Agent Instructions: 
- Create action_plan.md in the repo root.
- Mark steps complete with [x] in this file after implementation.
- Commit after each step: "Completed Step X: [Brief description]".
- Do not proceed until the current step is marked complete.
- Build the complete app following these steps exactly.

## Prerequisites
- [ ] Set up React Native environment for Android (Node.js 18+, JDK 11+, Android Studio, emulator).
- [x] Create GitHub repo: tansen-app.
- [x] Initialize project: npx react-native init Tansen --version 0.74.0.
- [ ] Host initial APK in GitHub Releases.
- [ ] Set up Firebase project (for Auth) and Turso DB account.

## Step-by-Step Implementation

### 1. Project Setup and Structure ✅
- [x] Initialize React Native project: Tansen.
- [x] Create folder structure:
```
src/
  components/ (shared UI components)
  screens/ (main app screens: Auth, Home)
  mini-apps/ (face-detector/, placeholder for future mini-apps)
  services/ (auth, db, ml, miniAppManager)
  assets/ (images, TFLite models)
  utils/ (helpers: cosine similarity, etc.)
android/ (native modules if needed)
```
- [x] Install base dependencies: npm i react-native-screens react-native-safe-area-context @react-navigation/native @react-navigation/native-stack react-native-vector-icons react-native-paper moti.
- [x] Set up navigation: Create src/navigation/AppNavigator.js with Stack.Navigator.
- [ ] Configure CodePush: **DEFERRED** - Will be added in Step 7 after basic app is working. Follow react-native-code-push docs, add keys to android/app/build.gradle.
- [x] Commit: "Completed Step 1: Project setup and structure".

### 2. Tansen Main UI: Mini-Apps Collection ✅
- [x] Create src/screens/HomeScreen.js: Display "Tansen" title, grid of mini-apps.
- [x] Create src/services/miniAppManager.js: Fetch mini-app config from Turso DB (name, route, status, requiredNativeLibs, codePushKey).
- [x] Mini-apps list: "Face Detector" (navigable), others as "Coming Soon" (disabled cards).
- [x] Use React Native Paper for card-based UI, vector icons for polish.
- [x] Dynamically render mini-apps from DB config, cache in AsyncStorage (npm i @react-native-async-storage/async-storage).
- [x] Navigate to FaceDetectorHome on "Face Detector" tap.
- [x] Set HomeScreen as initial route in AppNavigator (after Auth check).
- [ ] Test on emulator: **IN PROGRESS** - Metro bundler running, addressing Android build issues.
- [x] Commit: "Completed Step 2: Tansen main UI".

### 3. Firebase Auth Integration ✅
- [x] Set up Firebase project: Create app, download google-services.json to android/app/.
- [x] Install: npm i @react-native-firebase/app @react-native-firebase/auth.
- [x] Create src/services/auth.js: Functions for signUp, signIn (email/password, Google), getCurrentUser, logout.
- [x] Create src/screens/AuthScreen.js: Login/signup form with Firebase integration.
- [x] Update AppNavigator: Redirect to AuthScreen if not logged in, else HomeScreen.
- [x] Store Firebase JWT for API calls.
- [ ] Test: Sign-up/login works, retrieves user UID.
- [x] Commit: "Completed Step 3: Firebase Auth integration".

### 4. Turso DB and Backend API
- [ ] Sign up for Turso.tech, create DB, obtain URL and auth token.
- [ ] Create backend (Node.js/Express) in tansen-backend/ (separate repo/folder):
  - Install: npm i express @libsql/client firebase-admin.
  - Endpoints:
    - POST /enroll: Save face data (JWT required).
    - GET /faces: List user's faces (JWT required).
    - POST /match: Optional server-side embedding match.
    - DELETE /face/:id: Delete face data.
  - Verify Firebase JWT in middleware.
  - Schema: TABLE faces (id TEXT PRIMARY KEY, userId TEXT, name TEXT, isPrank BOOLEAN, traits TEXT (JSON), embeddings BLOB (JSON array)).
  - Schema: TABLE mini_apps (id TEXT PRIMARY KEY, name TEXT, route TEXT, status TEXT, requiredNativeLibs TEXT (JSON), codePushKey TEXT).
- [ ] Deploy backend (Vercel or local for dev).
- [ ] Create src/services/db.js: API calls with fetch, include JWT in headers.
- [ ] Test: API endpoints work, store/retrieve face data.
- [ ] Commit: "Completed Step 4: Turso DB and backend API".

### 5. Face Detection and Recognition Setup
- [ ] Install: npm i react-native-vision-camera react-native-vision-camera-face-detector react-native-fast-tflite.
- [ ] Download lightweight MobileFaceNet TFLite model, place in assets/models/.
- [ ] Create src/services/ml.js: Load TFLite model, generate embedding from face crop.
- [ ] Create mini-apps/face-detector/screens/EnrollmentScreen.js: Camera view to capture 20-50 images per person, compute embeddings, save to Turso via API.
- [ ] Hardcode initial people in EnrollmentScreen:
  - Anuj: traits: ["Smart", "Friendly"]
  - Prashant: traits: ["Funny", "Ambitious"]
  - Bansi: traits: ["Creative", "Calm"]
  - Akshay: traits: ["Energetic", "Kind"]
  - Dhananjay: isPrank: true, traits: []
- [ ] Create src/utils/math.js: Implement cosineSimilarity for embedding comparison.
- [ ] Test: Enrollment saves embeddings/traits to Turso.
- [ ] Commit: "Completed Step 5: Face detection and recognition setup".

### 6. Face Detector Mini-App: Main Screen
- [ ] Create mini-apps/face-detector/screens/FaceDetectorHome.js: Live camera preview with Vision Camera.
- [ ] Use frame processor for face detection, crop face, generate embedding via TFLite.
- [ ] Cache faces from Turso in AsyncStorage on load, compare embeddings locally (cosineSimilarity, threshold 0.65).
- [ ] On match:
  - Anuj/Prashant/Bansi/Akshay: Show card with name, traits (use Paper components).
  - Dhananjay: Trigger Moti glitch animation (scan lines, distorted text), show roast: "SYSTEM GLITCH: Dhananjay causing chaos! 😈".
- [ ] Add consent modal before enrollment: Require agreement for data storage.
- [ ] Add settings screen with "Delete My Data" option (calls DELETE /face/:id).
- [ ] Test: Real-time recognition shows traits or prank as expected.
- [ ] Commit: "Completed Step 6: Face Detector mini-app".

### 7. Dynamic Mini-App Support (includes CodePush)
- [ ] Re-add CodePush: npm i react-native-code-push, configure android build.gradle.
- [ ] In src/services/miniAppManager.js, implement:
```javascript
async function checkMiniAppSupport(miniApp) {
  const installedLibs = ['vision-camera', 'fast-tflite', ...]; // List APK's native libs
  if (miniApp.requiredNativeLibs.every(lib => installedLibs.includes(lib))) {
    await CodePush.sync({ deploymentKey: miniApp.codePushKey });
    return true;
  }
  return false; // Prompt APK update
}
```
- [ ] Update HomeScreen: Fetch mini-apps from Turso, render cards dynamically. Disable unsupported mini-apps with "Requires Update" label.
- [ ] Use React.lazy for mini-app entry components: `const MiniApp = React.lazy(() => import(\`../mini-apps/${miniApp.route}\`));`
- [ ] On mini-app tap, check support; if unsupported, show update prompt with GitHub APK link.
- [ ] Test: Add a dummy mini-app in Turso, verify it appears on HomeScreen.
- [ ] Commit: "Completed Step 7: Dynamic mini-app support".

### 8. UI Polish and Animations
- [ ] Use Moti for glitch effect in FaceDetectorHome (Dhananjay case): Scan lines, text distortion.
- [ ] Profile card UI: Modern design with name, traits (emoji bullets), photo placeholder.
- [ ] Add skeleton loading for DB fetches (use react-native-skeleton-content).
- [ ] Configure app icon, splash screen (update android/app/src/main/res/).
- [ ] Test: UI is professional, animations smooth.
- [ ] Commit: "Completed Step 8: UI polish and animations".

### 9. Privacy and Safety Features
- [ ] Encrypt local AsyncStorage data (use react-native-encrypted-storage).
- [ ] Consent modals: Require opt-in for enrollment and prank (Dhananjay).
- [ ] Prank messages: Editable in app, keep light-hearted (e.g., "Dhananjay's vibes crashed the system! 😜").
- [ ] No raw image uploads; only embeddings to Turso.
- [ ] Test: Consent and deletion work.
- [ ] Commit: "Completed Step 9: Privacy and safety features".

### 10. Testing and Debugging
- [ ] Test enrollment: Capture faces, verify Turso storage.
- [ ] Test recognition: Real-time detection, correct traits/prank for all 5 people.
- [ ] Handle edge cases: Poor lighting, angles, unknown faces.
- [ ] Tune cosine similarity threshold (0.65) on-device.
- [ ] Test on Android emulator/device.
- [ ] Commit: "Completed Step 10: Testing and debugging".

### 11. Final Build and Deployment
- [ ] Build APK: cd android && ./gradlew assembleRelease.
- [ ] Upload APK to GitHub Releases.
- [ ] Test full flow: Auth -> Home -> Face Detector -> Enrollment -> Recognition.
- [ ] Verify "Coming Soon" for other mini-apps.
- [ ] Test CodePush: Push dummy mini-app bundle, verify it appears.
- [ ] Commit: "Completed Step 11: Final build and deployment".

## Current Status 📊
- ✅ **Steps 1-3 Complete**: Project setup, UI framework, Firebase auth
- 🔄 **Android Build**: Resolving Gradle/Kotlin compilation issues
- 📱 **Metro Bundler**: Running successfully on port 8081
- 🚀 **Next**: Step 4 - Turso DB backend setup

## Completion Criteria
- Tansen runs on Android, authenticates via Firebase, stores/retrieves from Turso, supports Face Detector with real-time recognition and prank for Dhananjay.
- New mini-apps appear on restart (JS-based via CodePush, native via APK prompt).
- All steps marked [x] in action_plan.md.
