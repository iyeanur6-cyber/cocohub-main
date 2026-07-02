#!/bin/bash
# Run this script after pushing to GitHub to create all bounty issues
# Prerequisites: GitHub CLI (gh) must be installed and authenticated
# Install: https://cli.github.com
# Usage: bash scripts/create-github-issues.sh

REPO="cocohub-mobileapp/cocohub-main"

echo "Creating Cocohub bounty issues on $REPO..."

# ── LARGE BOUNTIES ──────────────────────────────────────────────────────────

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Soroban smart contract — on-chain pet record registry" \
  --label "bounty,enhancement,stellar,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`150 XLM\`
**Size:** 🔴 Large
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Build a Soroban smart contract that acts as an on-chain registry for pet medical records. The contract should allow vets with approved access to write record hashes, and anyone to verify a record's authenticity by querying the contract.

## Acceptance Criteria

- [ ] Soroban contract written in Rust with \`store_record(pet_id, record_hash, vet_address)\` and \`verify_record(record_id) -> bool\` functions
- [ ] Contract deployed to Stellar testnet
- [ ] \`src/services/blockchainService.ts\` updated to call the new contract
- [ ] Unit tests for contract functions
- [ ] Integration test demonstrating store → verify flow
- [ ] README section on how to deploy the contract

## Files Likely Involved

\`\`\`
src/services/blockchainService.ts
backend/services/stellarService.ts
contracts/ (new directory)
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 1 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Wearable device sync — FitBark & Whistle API integration" \
  --label "bounty,enhancement,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`120 XLM\`
**Size:** 🔴 Large
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Integrate FitBark and/or Whistle pet wearable APIs so activity and sleep data automatically syncs into the Cocohub health dashboard.

## Acceptance Criteria

- [ ] OAuth flow to connect FitBark or Whistle account from Settings screen
- [ ] Daily activity data (steps, calories, sleep) synced to \`HealthMetric\` model
- [ ] Data shown on the Health Dashboard screen
- [ ] Sync runs in background via \`expo-background-fetch\`
- [ ] Graceful handling when wearable API is unavailable

## Files Likely Involved

\`\`\`
src/services/wearableService.ts
src/screens/SettingsScreen.tsx
src/screens/PetHealthDashboardScreen.tsx
backend/services/wearableService.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 2 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Telemedicine — WebRTC video consultation end-to-end flow" \
  --label "bounty,enhancement,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`100 XLM\`
**Size:** 🔴 Large
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Complete the telemedicine video consultation feature. The screen exists (\`TelemedicineScreen.tsx\`) and \`webrtcService.ts\` is scaffolded — the task is to wire them together end-to-end so a pet owner can start a video call with a vet.

## Acceptance Criteria

- [ ] Vet and owner can join a call room using a session token
- [ ] Video + audio streams working on both iOS and Android
- [ ] Mute / camera toggle controls
- [ ] Call timer displayed during session
- [ ] Graceful disconnection and reconnection handling
- [ ] Backend signaling via existing \`backend/server/websocket.ts\`

## Files Likely Involved

\`\`\`
src/screens/TelemedicineScreen.tsx
src/screens/VideoConsultationScreen.tsx
src/services/webrtcService.ts (src/services/videoCallService.ts backend)
backend/services/webrtcService.ts
backend/server/websocket.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 3 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] AI symptom checker — breed + symptom input → vet recommendation" \
  --label "bounty,enhancement,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`100 XLM\`
**Size:** 🔴 Large
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Build an AI-powered symptom checker. User selects their pet's breed and describes symptoms (free text or checklist). The feature returns likely conditions and whether an urgent vet visit is recommended.

## Acceptance Criteria

- [ ] New screen: \`SymptomCheckerScreen.tsx\`
- [ ] Breed selector (from existing breeds data in \`backend/src/data/breeds.ts\`)
- [ ] Symptom input (multi-select checkboxes + free text)
- [ ] Integration with an LLM API (OpenAI / Gemini) or a rules-based engine
- [ ] Response displays: likely conditions, severity (low/medium/urgent), recommended action
- [ ] Prominent disclaimer: \"This is not veterinary advice\"
- [ ] Unit tests for symptom processing logic

## Files Likely Involved

\`\`\`
src/screens/SymptomCheckerScreen.tsx (new)
src/services/mlPredictionService.ts
backend/src/data/breeds.ts
backend/server/routes/ (new endpoint)
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 4 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Apple Watch companion app — pet health glance widget (SwiftUI)" \
  --label "bounty,enhancement,ios,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`75 XLM\`
**Size:** 🔴 Large
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Build an Apple Watch companion app that shows a pet health glance: next medication due, next appointment, and health score. Emergency SOS shortcut is a bonus.

## Acceptance Criteria

- [ ] WatchKit extension created in the iOS native project
- [ ] Shows: active pet name + health score, next medication (name + time), next appointment (date)
- [ ] Data synced from the phone app via WatchConnectivity
- [ ] Tapping the watch opens the relevant screen on iPhone
- [ ] Works on watchOS 10+

## Files Likely Involved

\`\`\`
ios/ (native WatchKit target)
src/services/widgetService.ts (for data interface)
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 5 created"

# ── MEDIUM BOUNTIES ──────────────────────────────────────────────────────────

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Dark mode — full app theming pass" \
  --label "bounty,enhancement,UI,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`50 XLM\`
**Size:** 🟡 Medium
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

The app follows the system theme but several screens have hardcoded light-mode colors. This task is a full theming pass to ensure every screen looks correct in dark mode.

## Acceptance Criteria

- [ ] All 75+ screens render correctly in dark mode (no white flash, no invisible text)
- [ ] All hardcoded color strings replaced with theme tokens from \`src/theme/colors.ts\`
- [ ] Tested on both iOS (Dark Appearance) and Android (Dark theme)
- [ ] Screenshots of before/after for at least 10 screens in the PR

## Files Likely Involved

\`\`\`
src/screens/**/*.tsx
src/components/**/*.tsx
src/theme/colors.ts
src/theme/tokens.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 6 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] French language translation (i18n)" \
  --label "bounty,i18n,help wanted,good first issue" \
  --body "## 💰 Bounty

**Reward:** \`40 XLM\`
**Size:** 🟡 Medium
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Add a complete French (fr) translation to the app. The English source strings are in \`src/i18n/locales/en.json\`. Spanish is already done as a reference (\`src/i18n/locales/es.json\`).

## Acceptance Criteria

- [ ] \`src/i18n/locales/fr.json\` created with all keys from \`en.json\` translated
- [ ] \`src/i18n/locales/fr.ts\` TypeScript wrapper created (matching \`es.ts\` pattern)
- [ ] French added to the language selector in \`src/components/LanguageSelector.tsx\`
- [ ] Registered in \`src/i18n/index.ts\`
- [ ] Translations are natural French — not just Google Translate output
- [ ] RTL not required (French is LTR)

## Files Likely Involved

\`\`\`
src/i18n/locales/en.json (source)
src/i18n/locales/fr.json (new)
src/i18n/locales/fr.ts (new)
src/i18n/index.ts
src/components/LanguageSelector.tsx
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. French speakers strongly preferred!"

echo "✅ Issue 7 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Portuguese (BR) language translation (i18n)" \
  --label "bounty,i18n,help wanted,good first issue" \
  --body "## 💰 Bounty

**Reward:** \`40 XLM\`
**Size:** 🟡 Medium
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Add a complete Brazilian Portuguese (pt-BR) translation. Same scope as the French bounty above.

## Acceptance Criteria

- [ ] \`src/i18n/locales/pt-BR.json\` with all keys from \`en.json\` translated
- [ ] \`src/i18n/locales/pt-BR.ts\` TypeScript wrapper
- [ ] Added to language selector and \`src/i18n/index.ts\`
- [ ] Natural pt-BR — not machine translation

## Files Likely Involved

\`\`\`
src/i18n/locales/en.json (source)
src/i18n/locales/pt-BR.json (new)
src/i18n/locales/pt-BR.ts (new)
src/i18n/index.ts
src/components/LanguageSelector.tsx
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. Portuguese speakers strongly preferred!"

echo "✅ Issue 8 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Stellar trustline UI — PETC / VETH / PAWP token management screen" \
  --label "bounty,enhancement,stellar,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`40 XLM\`
**Size:** 🟡 Medium
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Build the Trustline management screen so users can enable/disable Cocohub's Stellar tokens (PETC, VETH, PAWP) directly from the app. The \`TrustlineScreen.tsx\` exists but is incomplete.

## Acceptance Criteria

- [ ] Screen shows all three tokens with current balance and trustline status
- [ ] User can add/remove a trustline with one tap (signed with their Stellar keypair)
- [ ] Transaction status shown (pending / confirmed / failed)
- [ ] Tested on Stellar testnet
- [ ] Uses existing \`src/services/trustlineService.ts\`

## Files Likely Involved

\`\`\`
src/screens/TrustlineScreen.tsx
src/services/trustlineService.ts
src/services/stellarAccountService.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 9 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Health metrics export — vet-ready PDF report generation" \
  --label "bounty,enhancement,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`35 XLM\`
**Size:** 🟡 Medium
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Generate a clean, vet-ready PDF summary of a pet's health metrics (weight, vitals, health score trend, vaccinations, medications) that can be shared via email or downloaded.

## Acceptance Criteria

- [ ] PDF includes: pet name/photo, health score, weight chart, vaccination table, active medications
- [ ] PDF generated via \`pdfkit\` on the backend (already a dependency)
- [ ] Download triggered from \`PetHealthDashboardScreen\` and \`MedicalRecordViewerScreen\`
- [ ] Shared via \`expo-sharing\` on mobile
- [ ] PDF is readable and professionally formatted

## Files Likely Involved

\`\`\`
src/screens/PetHealthDashboardScreen.tsx
src/services/pdfService.ts
backend/services/reportService.ts
backend/server/routes/reports.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 10 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Add Detox E2E tests for the full medication tracking flow" \
  --label "bounty,testing,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`25 XLM\`
**Size:** 🟡 Medium
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Write Detox E2E tests covering the medication tracking flow: add medication → view schedule → log a dose → check history.

## Acceptance Criteria

- [ ] Test: add a new medication with a daily schedule
- [ ] Test: mark a dose as taken
- [ ] Test: view medication history
- [ ] Test: receive a (mocked) push notification for a dose
- [ ] Tests run on both iOS and Android simulators
- [ ] Added to \`.github/workflows/e2e-detox.yml\`

## Files Likely Involved

\`\`\`
e2e/ (new test file)
.detoxrc.js
.github/workflows/e2e-detox.yml
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. See [CONTRIBUTING.md](../../CONTRIBUTING.md)."

echo "✅ Issue 11 created"

# ── SMALL BOUNTIES ───────────────────────────────────────────────────────────

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Fix: SOS button not visible on Android lock screen" \
  --label "bounty,bug,android,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`15 XLM\`
**Size:** 🟢 Small
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

The Emergency SOS button should be accessible from the Android lock screen without unlocking the device. Currently the button renders but the tap doesn't register on some Android 13/14 devices.

## Acceptance Criteria

- [ ] SOS button tap works on Android lock screen (tested on Android 13 and 14)
- [ ] Uses \`WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED\` or equivalent Expo approach
- [ ] No regression on iOS

## Files Likely Involved

\`\`\`
src/components/SOSButton.tsx
src/services/emergencyService.ts
android-widget/PetChainWidgetProvider.java
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below."

echo "✅ Issue 12 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Fix: Offline sync queue not clearing after successful push" \
  --label "bounty,bug,help wanted" \
  --body "## 💰 Bounty

**Reward:** \`15 XLM\`
**Size:** 🟢 Small
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

When offline queue items are successfully synced to the server, they should be removed from the local queue. In some cases they persist and get re-sent on the next sync, causing duplicate records.

## Steps to Reproduce

1. Go offline
2. Create a new pet record
3. Come back online
4. Observe the sync
5. Record is created twice on the server

## Acceptance Criteria

- [ ] Successfully synced items are removed from AsyncStorage queue
- [ ] No duplicate records on re-sync
- [ ] Unit test added to \`src/services/__tests__/syncService.test.ts\`

## Files Likely Involved

\`\`\`
src/services/syncService.ts
src/services/offlineQueue.ts
src/services/__tests__/syncService.test.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below."

echo "✅ Issue 13 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Fix: Weight chart accessibility labels missing (WCAG)" \
  --label "bounty,bug,accessibility,help wanted,good first issue" \
  --body "## 💰 Bounty

**Reward:** \`10 XLM\`
**Size:** 🟢 Small
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

The WeightChart component renders a visual graph but has no \`accessibilityLabel\` on data points, making it unusable with screen readers (VoiceOver / TalkBack).

## Acceptance Criteria

- [ ] Each data point has a meaningful \`accessibilityLabel\` (e.g. \"January 5: 4.2 kg\")
- [ ] Chart has an \`accessibilityRole\` and summary label
- [ ] Existing test in \`src/components/__tests__/WeightChart.test.ts\` updated
- [ ] \`src/components/weightChartAccessibility.ts\` used/updated

## Files Likely Involved

\`\`\`
src/components/WeightChart.tsx
src/components/weightChartAccessibility.ts
src/components/__tests__/WeightChart.test.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. Great first issue!"

echo "✅ Issue 14 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Docs: Backend API local setup guide (Docker + PostgreSQL)" \
  --label "bounty,documentation,help wanted,good first issue" \
  --body "## 💰 Bounty

**Reward:** \`10 XLM\`
**Size:** 🟢 Small
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Write a clear step-by-step guide for setting up the Cocohub backend locally (Docker, PostgreSQL, Redis, migrations, seed data). Many contributors struggle with this first step.

## Acceptance Criteria

- [ ] Guide covers: prerequisites, Docker setup, env vars, running migrations, seeding, verifying the API is running
- [ ] Includes troubleshooting section for common errors (port conflicts, Docker not running, etc.)
- [ ] Written as \`docs/BACKEND-SETUP.md\`
- [ ] Linked from README.md

## Files Likely Involved

\`\`\`
docs/BACKEND-SETUP.md (new)
README.md (add link)
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. Great first issue — no code required!"

echo "✅ Issue 15 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Docs: Stellar testnet setup guide for local development" \
  --label "bounty,documentation,stellar,help wanted,good first issue" \
  --body "## 💰 Bounty

**Reward:** \`10 XLM\`
**Size:** 🟢 Small
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

Write a guide for setting up a Stellar testnet account for Cocohub local development: creating a keypair, funding via Friendbot, configuring the app to use testnet, and testing the blockchain record flow.

## Acceptance Criteria

- [ ] Guide covers: creating Stellar keypair, Friendbot funding, .env configuration, testing \`blockchainService.ts\` locally
- [ ] Includes Stellar Laboratory links and Freighter wallet setup
- [ ] Written as \`docs/STELLAR-SETUP.md\`
- [ ] Linked from README.md and CONTRIBUTING.md

## Files Likely Involved

\`\`\`
docs/STELLAR-SETUP.md (new)
README.md
CONTRIBUTING.md
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below."

echo "✅ Issue 16 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] UI: Empty state screens for pets list and records list" \
  --label "bounty,UI,help wanted,good first issue" \
  --body "## 💰 Bounty

**Reward:** \`10 XLM\`
**Size:** 🟢 Small
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

When a new user first opens the app, the pet list and records list are blank. They should show a friendly empty state with an illustration, a short message, and a CTA button to add their first pet/record.

## Acceptance Criteria

- [ ] \`PetListScreen\` shows empty state when user has no pets
- [ ] \`MedicalRecordViewerScreen\` shows empty state when pet has no records
- [ ] Uses the existing \`EmptyState.tsx\` component (or improves it)
- [ ] Empty state includes: illustration/icon, headline, subtext, CTA button
- [ ] Looks good in both light and dark mode

## Files Likely Involved

\`\`\`
src/screens/PetListScreen.tsx
src/screens/MedicalRecordViewerScreen.tsx
src/components/EmptyState.tsx
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. Great first issue!"

echo "✅ Issue 17 created"

gh issue create --repo "$REPO" \
  --title "[BOUNTY] Test: Unit tests for dosageCalculator utility" \
  --label "bounty,testing,help wanted,good first issue" \
  --body "## 💰 Bounty

**Reward:** \`8 XLM\`
**Size:** 🟢 Small
**Payment:** Via [GrantFox](https://grantfox.xyz) smart escrow — released within 48h of merge

---

## 📋 Task Description

\`src/utils/dosageCalculator.ts\` calculates medication doses based on pet weight and species. It needs comprehensive unit tests to ensure correctness — especially edge cases (zero weight, very large animals, rounding).

## Acceptance Criteria

- [ ] \`src/utils/__tests__/dosageCalculator.test.ts\` has ≥ 15 test cases
- [ ] Covers: normal cases, edge cases (0kg, 100kg+), different species multipliers, rounding behaviour
- [ ] All tests pass with \`npm test\`
- [ ] Coverage for this file reaches ≥ 90%

## Files Likely Involved

\`\`\`
src/utils/dosageCalculator.ts
src/utils/__tests__/dosageCalculator.test.ts
\`\`\`

## How to Claim

Comment **\`I'd like to work on this\`** below. Perfect first issue if you're new to Jest!"

echo "✅ Issue 18 created"

echo ""
echo "🎉 All bounty issues created successfully!"
echo "View them at: https://github.com/$REPO/issues"
