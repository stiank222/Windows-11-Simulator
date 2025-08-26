import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Calculator = () => {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    if (operation && previousValue !== null) {
      const inputValue = parseFloat(display);
      const newValue = calculate(previousValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clearDisplay = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay("0.");
      setWaitingForNewValue(false);
    } else if (display.indexOf(".") === -1) {
      setDisplay(display + ".");
    }
  };

  const buttons = [
    [
      { text: "C", onClick: clearDisplay, variant: "secondary" as const },
      { text: "CE", onClick: clearEntry, variant: "secondary" as const },
      { text: "⌫", onClick: () => setDisplay(display.slice(0, -1) || "0"), variant: "secondary" as const },
      { text: "÷", onClick: () => inputOperation("÷"), variant: "outline" as const },
    ],
    [
      { text: "7", onClick: () => inputNumber("7"), variant: "ghost" as const },
      { text: "8", onClick: () => inputNumber("8"), variant: "ghost" as const },
      { text: "9", onClick: () => inputNumber("9"), variant: "ghost" as const },
      { text: "×", onClick: () => inputOperation("×"), variant: "outline" as const },
    ],
    [
      { text: "4", onClick: () => inputNumber("4"), variant: "ghost" as const },
      { text: "5", onClick: () => inputNumber("5"), variant: "ghost" as const },
      { text: "6", onClick: () => inputNumber("6"), variant: "ghost" as const },
      { text: "-", onClick: () => inputOperation("-"), variant: "outline" as const },
    ],
    [
      { text: "1", onClick: () => inputNumber("1"), variant: "ghost" as const },
      { text: "2", onClick: () => inputNumber("2"), variant: "ghost" as const },
      { text: "3", onClick: () => inputNumber("3"), variant: "ghost" as const },
      { text: "+", onClick: () => inputOperation("+"), variant: "outline" as const },
    ],
    [
      { text: "±", onClick: () => setDisplay(String(-parseFloat(display))), variant: "ghost" as const },
      { text: "0", onClick: () => inputNumber("0"), variant: "ghost" as const },
      { text: ".", onClick: inputDecimal, variant: "ghost" as const },
      { text: "=", onClick: performCalculation, variant: "default" as const },
    ],
  ];

  return (
    <div className="h-full bg-background p-4 max-w-sm mx-auto">
      {/* Display */}
      <div className="mb-4 p-4 bg-muted rounded-lg">
        <div className="text-right text-3xl font-mono text-foreground overflow-hidden">
          {display}
        </div>
        {operation && previousValue !== null && (
          <div className="text-right text-sm text-muted-foreground">
            {previousValue} {operation}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {buttons.flat().map((button, index) => (
          <Button
            key={index}
            variant={button.variant}
            className="h-14 text-lg font-semibold"
            onClick={button.onClick}
          >
            {button.text}
          </Button>
        ))}
      </div>

      {/* Memory buttons */}
      <div className="grid grid-cols-6 gap-1 mt-4">
        {["MC", "MR", "M+", "M-", "MS", "M↑"].map((text) => (
          <Button
            key={text}
            variant="ghost"
            size="sm"
            className="text-xs h-8"
            disabled
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  );
};