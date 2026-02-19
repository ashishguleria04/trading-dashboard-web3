# Trading Dashboard Web3

A modern, high-performance trading analytics dashboard built with Next.js and Tailwind CSS. This application provides traders with comprehensive insights into their trading performance, including PnL analysis, win/loss ratios, and detailed trade history.


## 🚀 Features

- **Dashboard Overview**: Get a quick snapshot of your trading performance with key metrics.
- **Advanced Analytics**:
  - **PnL Chart**: Visual representation of Profit and Loss over time.
  - **Win/Loss Analysis**: Detailed breakdown of winning vs. losing trades.
  - **Risk Metrics**: Monitor your risk-to-reward ratios and other critical risk parameters.
  - **KPI Grid**: key performance indicators at a glance.
- **Trade History**: Comprehensive table of all trades with filtering capabilities:
  - Filter by Symbol (e.g., BTC, ETH)
  - Filter by Date Range (Last 7 days, 30 days, All time)
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop and mobile devices.
- **Dark Mode UI**: Sleek, professional dark mode interface designed for traders.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Chart.js](https://www.chartjs.org/) with [react-chartjs-2](https://react-chartjs-2.js.org/)
- **Utilities**: `clsx`, `tailwind-merge`, `date-fns` for robust class handling and date manipulation.

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/trading-dashboard-web3.git
    cd trading-dashboard-web3
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

4.  **Open your browser:**
    Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```bash
trading-dashboard-web3/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js App Router pages and layouts
│   ├── components/      # Reusable React components
│   │   ├── dashboard/   # Dashboard-specific components (Charts, Tables)
│   │   └── layout/      # Layout components (Sidebar, Navbar)
│   ├── services/        # Service layer (Mock data generation, API calls)
│   └── lib/             # Utility functions
├── package.json         # Project dependencies and scripts
└── README.md            # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
