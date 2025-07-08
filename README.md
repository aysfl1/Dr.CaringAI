
# Dr. CaringAI

**Dr. CaringAI** is an AI-powered web application that provides users with secure, step-by-step medical consultations, personalized diagnoses, and treatment plans. The platform is designed for both patients and admin/doctor users, offering a seamless experience.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Key Components & Pages](#key-components--pages)
- [State Management & Context](#state-management--context)
- [API Layer](#api-layer)
- [Authentication](#authentication)
- [How the Consultation Flow Works](#how-the-consultation-flow-works)
- [Admin Features](#admin-features)
- [Styling & UI](#styling--ui)
- [Running the App](#running-the-app)
- [Customization & Extending](#customization--extending)
- [License](#license)

---

## Features

- **Patient Intake**: Collects detailed patient information before starting a consultation.
- **Conversational AI Chat**: Patients interact with an AI doctor in a chat interface, answering questions and describing symptoms.
- **Stepwise Consultation**: The app guides users through information gathering, differential diagnosis, final diagnosis, treatment options, and generates a report.
- **Admin Dashboard**: Admins can view patients, consultations, analytics, and reports.
- **Authentication**: Simple client-side authentication for admin access.
- **Modern UI**: Responsive, accessible, and visually appealing interface using React Bootstrap and FontAwesome.
- **Privacy & Security**: Emphasizes patient data privacy.

---

## Project Structure

```
src/
  App.js                # Main app and routing
  components/           # Reusable UI components (chat, forms, navigation, etc.)
  context/              # React Contexts for Auth and Consultation state
  pages/                # Main pages (Home, Login, Consultation, Admin, etc.)
    admin/              # Admin dashboard and subpages
    static/             # Static info pages (About, FAQ, etc.)
  services/             # API abstraction (mocked for client-side demo)
  assets/               # Images and static assets
public/                 # Static files and index.html
```

---

## Key Components & Pages

- **App.js**: Sets up routing, context providers, and layout.
- **Navigation.js / Footer.js**: Top and bottom navigation, responsive for both patients and admins.
- **HomePage.js**: Landing page with hero section, features, and call-to-action.
- **PatientIntakeForm.js / PatientFormPage.js**: Collects patient demographics and medical history.
- **ConsultationChat.js**: Main chat interface for the AI consultation, with progress tracking and dynamic questions.
- **DiagnosisTreatment.js**: Displays diagnosis, explanations, treatment options, and allows report generation.
- **Admin Pages**: Dashboard, Patients, Consultations, Reports, Analytics, and Settings for admin users.
- **Static Pages**: About, How It Works, FAQ, Contact, Terms, Privacy, etc.

---

## State Management & Context

- **AuthContext**: Manages authentication state for admin users. In this demo, authentication is always "on" for simplicity.
- **ConsultationContext**: Manages the entire consultation flow, including current step, questions, answers, diagnosis, treatment, and report generation. All logic is handled client-side for demo purposes.

---

## API Layer

- **services/api.js**: Contains mock API functions for patients and consultations. In a real deployment, these would connect to a backend server.
- **services/adminAPI.js**: Mock admin endpoints for dashboard stats, analytics, and reports.

> **Note:** The current implementation is fully client-side and uses localStorage and direct API calls to OpenAI/Perplexity for demonstration. No real backend is required for basic usage.

---

## Authentication

- **LoginPage.js**: Simple login form for admin access. Auth is handled client-side and always "succeeds" for demo purposes.
- **ProtectedRoute**: Ensures only authenticated users can access admin routes.

---

## How the Consultation Flow Works

1. **Patient Intake**: User fills out a detailed form with demographics and medical history.
2. **Start Consultation**: User is guided to the chat interface.
3. **Conversational Interview**: The AI asks follow-up questions, collects answers, and tracks progress.
4. **Differential Diagnosis**: AI presents possible diagnoses and asks clarifying questions.
5. **Final Diagnosis & Treatment**: AI provides a final diagnosis, explains reasoning, and suggests treatment options.
6. **Report Generation**: User can generate and download a PDF report of the consultation.

---

## Admin Features

- **Dashboard**: Overview of patients and consultations.
- **Patients**: View, add, edit, and delete patient records.
- **Consultations**: Review past consultations.
- **Reports & Analytics**: Access generated reports and usage analytics.
- **Settings**: Update system, profile, and security settings.

---

## Styling & UI

- **React Bootstrap**: Used for layout, forms, and components.
- **FontAwesome**: Medical and UI icons.
- **Custom CSS**: For branding and additional styles.
- **Responsive Design**: Works on desktop and mobile devices.

---

## Running the App

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Build for production:**
   ```bash
   npm run build
   ```

---

## Customization & Extending

- **Backend Integration**: Replace the mock API layer with real endpoints for production.
- **Authentication**: Implement secure authentication and authorization for admin features.
- **AI Model**: Connect to your own OpenAI/Perplexity API keys or a custom backend for medical logic.
- **Styling**: Customize colors, branding, and layout in `App.css` and component styles.

---

## License

This project is for demonstration and educational purposes. For production use, ensure compliance with all relevant healthcare regulations and data privacy laws.

---

**Dr. CaringAI** – Revolutionizing healthcare through AI-powered consultations.

---
