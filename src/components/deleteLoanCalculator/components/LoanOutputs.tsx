import { useState, useEffect, ReactElement } from "react";
import calculate from "../utils/Calculate";
import toCurrency from "../utils/ToCurrency";
import "../assets/styles.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function LoanOutputs({ loan }: any): ReactElement {
  let { loanAmount, loanTerm, interestRate } = loan;

  let [doughnutChart, setDoughnutChart] = useState({
    labels: ["Total Interest Paid", "Loan Amount"],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 0],
        backgroundColor: ["rgba(100,100,100,1)", "rgba(200, 200, 200, 1)"],
        borderColor: ["rgba(100,100,100,1)", "rgba(200, 200, 200, 1)"],
        borderWidth: 0,
      },
    ],
  });

  interface loanCalculationsInterface {
    monthlyPayment: number;
    totalInterestPaid: number;
    totalPaid: number;
  }

  let [loanCalculations, setLoanCalculations] = useState<loanCalculationsInterface>({
    monthlyPayment: 0,
    totalInterestPaid: 0,
    totalPaid: 0,
  });

  useEffect(() => {
    setLoanCalculations(calculate(loanAmount, loanTerm, interestRate));
  }, [loan]);

  useEffect(() => {
    setDoughnutChart({
      labels: ["Total Interest Paid", "Loan Amount"],
      datasets: [
        {
          label: "# of Votes",
          data: [loanCalculations.totalInterestPaid, loanAmount],
          backgroundColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
          borderWidth: 0,
        },
      ],
    });
  }, [loanCalculations]);

  return (
    <div>
      <div>
        <div>MONTHLY PAYMENT:</div>
        <div>{toCurrency(loanCalculations.monthlyPayment)}</div>
      </div>
      <div>
        <div>TOTAL INTEREST PAID: </div>
        <div>{toCurrency(loanCalculations.totalInterestPaid)}</div>
      </div>
      <div>
        <div>LOAN AMOUNT:</div>
        <div>{toCurrency(loanAmount)}</div>
      </div>
      <div>
        <div>TOTAL PAID:</div>
        <div>{toCurrency(loanCalculations.totalPaid)}</div>
      </div>

      <Doughnut data={doughnutChart} />
    </div>
  );
}
