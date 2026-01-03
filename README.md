# GFPriceChecker

iOS app for tracking gluten-free vs regular product price differentials for Canadian tax deductions.

## Overview

GFPriceChecker helps individuals with celiac disease document the price difference between gluten-free and regular products for Canadian Revenue Agency (CRA) medical expense claims. The app provides camera-based OCR scanning, receipt verification, and professional PDF/CSV export reports.

## Status

**Active Development** - Currently in field testing and refinement.

This is a personal project built primarily for family use, made available to the broader celiac community at no cost.

## Features

- Manual product entry with price comparison
- Camera scanning with OCR for shelf price tags and receipts
- Receipt verification and product matching
- PDF and CSV export for CRA tax filing
- Data backup/restore
- No ads, no tracking, completely free

## Requirements

- **iOS:** 18.0 or later
- **Xcode:** 16.1.1 or later
- **Swift:** 6.0
- **Device:** iPhone with camera (recommended for OCR features)

## Installation

1. Clone the repository
```
git clone https://github.com/CuWilliams/GFPriceChecker.git
```

2. Open project in Xcode
```
cd GFPriceChecker
open GFPriceChecker.xcodeproj
```

3. Build and run
- Select target device or simulator
- Press `Cmd+R` to build and run

## Documentation

Comprehensive development history and technical decisions documented in `claude.md`.

For website development plan, see `TECHNICAL_REQUIREMENTS.md` and `EXECUTION_PLAN.md`.

## Project Structure
```
GFPriceChecker/
├── Models/              # SwiftData persistence models
├── Views/               # SwiftUI views
│   ├── Library/         # Product list and detail views
│   ├── CaptureFlow/     # Camera and manual entry
│   ├── Reports/         # Export and dashboard
│   ├── Settings/        # App settings and preferences
│   └── Onboarding/      # First-run experience
├── ViewModels/          # Business logic and state management
├── Services/            # OCR, PDF, CSV, image storage
├── Utilities/           # Helpers and reusable components
└── Resources/           # Assets and app branding
```

## Contributing

This is a personal project with limited maintenance bandwidth. 

- **Forks:** Encouraged
- **Pull Requests:** Welcome but may not be reviewed promptly
- **Issues:** GitHub Issues disabled - contact via methods below instead

If you want to build an Android version or contribute significant features, please reach out first.

## Contact

- **GitHub Issues:** Disabled
- **X (Twitter):** [@CurtisWill3z](https://x.com/CurtisWill3z)
- **LinkedIn:** [Curtis Williams](https://www.linkedin.com/in/curtis-williams-154382b3)

## License

MIT License - see [LICENSE](LICENSE) file for details.

Copyright (c) 2025 Curtis Williams

## Acknowledgments

Developed with assistance from Anthropic's Claude AI using Claude Code for iOS development and documentation.

Built for the celiac community with focus on Canadian tax compliance requirements.
