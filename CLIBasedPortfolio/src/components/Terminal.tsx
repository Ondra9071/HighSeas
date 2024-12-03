import React, { useState, useEffect, useRef } from "react";

interface Theme {
  name: string;
  background: string;
  text: string;
  accent: string;
}

const Terminal: React.FC = () => {
  const themes: Theme[] = [
    { name: "default", background: "#1e1e1e", text: "#d4d4d4", accent: "#00ff00" },
    { name: "solarized", background: "#002b36", text: "#839496", accent: "#b58900" },
    { name: "gruvbox", background: "#282828", text: "#ebdbb2", accent: "#fabd2f" },
    { name: "monokai", background: "#272822", text: "#f8f8f2", accent: "#f92672" },
    { name: "nord", background: "#2e3440", text: "#d8dee9", accent: "#88c0d0" },
    { name: "dracula", background: "#282a36", text: "#f8f8f2", accent: "#bd93f9" },
    { name: "material", background: "#263238", text: "#c3e88d", accent: "#80cbc4" },
  ];

  const motd = [
    "░█▀▀▀█ ░█▄─░█ ░█▀▀▄ ░█▀▀█ ░█▀▀▀ ───░█ 　 ░█▀▀▀█ ░█▀▀▀█ ",
    "░█──░█ ░█░█░█ ░█─░█ ░█▄▄▀ ░█▀▀▀ ─▄─░█ 　 ░█──░█ ─▀▀▀▄▄ ",
    "░█▄▄▄█ ░█──▀█ ░█▄▄▀ ░█─░█ ░█▄▄▄ ░█▄▄█ 　 ░█▄▄▄█ ░█▄▄▄█",
    "-----------------------------------------------------------------------------------------------",
    "Welcome to my CLI based portfolio!",
    "Made with ♡ by Ondrej Pacovsky, for High Seas ☠.",
    "-----------------------------------------------------------------------------------------------",
    "Type 'help' to get started.",
  ];

  const aboutme = [
    "My name is Ondrej Pacovsky, I'm 18 years old and I'm currently going to School of Applied Cybernetics s. r. o. in Czech Republic.",
    " ",
    "I've been doing web development since elementary school, and I still haven't stopped enjoying it. I am most proficient in React with Typescript. At the same time, I've recently started using TailwindCSS to the fullest.",
    " ",
    "I don't have any big projects under my belt, but I have had the opportunity to participate in a few game servers, and at the moment, for example, the Learn HTML project, which has over 9,000 people on it at the moment.",
    " ",
    "My hobbies are of course anything related to technology, web development, networking and simple design.",
  ]

  const [history, setHistory] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>("");
  const [theme, setTheme] = useState<Theme>(themes[0]);
  const [commandIndex, setCommandIndex] = useState<number | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isRebooting, setIsRebooting] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isBooting) {
      setTimeout(() => {
        setHistory(motd);
        setIsBooting(false);
      }, 3000);
    }
  }, [isBooting]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (command: string): string[] => {
    const [cmd, ...args] = command.split(" ");
    switch (cmd) {
      case "help":
        return [
          "Available commands:",
          "- help: Show this help message.",
          "- aboutme: Prints information about me.",
          "- loadgui: Load the gui version of my portfolio.",
          "- reboot: Reboot the terminal.",
          "- theme list: List available themes.",
          "- theme [name]: Change to a specified theme.",
          "- clear: Clear the terminal.",
          "- echo [message]: Print the message.",
          "- ls: List directories.",
          "- cat [filename]: Prints out content of a file."
        ];
      case "aboutme":
        return aboutme;
      case "loadgui":
        window.open("https://ondrejpacovsky.cz", "_self")
        return [];
      case "clear":
        setHistory([]);
        return [];
      case "echo":
        return [args.join(" ")];
      case "ls":
        return ["hello.txt"];
      case "theme":
        if (args[0] === "list") {
          return themes.map((t) => t.name);
        } else {
          const selectedTheme = themes.find((t) => t.name === args[0]);
          if (selectedTheme) {
            setTheme(selectedTheme);
            return [`Theme changed to '${args[0]}'`];
          } else {
            return [`Theme '${args[0]}' not found. Use 'theme list' to view themes.`];
          }
        }
      case "cat":
        if (args[0] === "hello.txt") {
          return ["Hello World!"];
        } else {
          return [`cat: ${args[0]}: No such file or directory`];
        }
      case "reboot":
        setIsRebooting(true);
        setTimeout(() => {
          setHistory(motd);
          setIsRebooting(false);
        }, 3000);
        return ["Rebooting..."];
      default:
        return [`Unknown command: ${cmd}`];
    }
  };  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const userCommands = history.filter((line) => line.startsWith("$")).map((cmd) => cmd.slice(2));
  
    if (e.key === "Enter") {
      if (currentInput.trim() === "") return; // Zamezit odesílání prázdných příkazů
  
      // Přidání příkazu do historie
      setHistory((prev) => [...prev, `$ ${currentInput}`]);
  
      // Zpracování a přidání výstupu příkazu
      const output = handleCommand(currentInput);
      setHistory((prev) => [...prev, ...output]);
  
      // Vymazání vstupu a reset indexu
      setCurrentInput("");
      setCommandIndex(null);
    } else if (e.key === "ArrowUp") {
      setCommandIndex((prev) => {
        const newIndex = prev === null ? userCommands.length - 1 : Math.max(0, prev - 1);
        setCurrentInput(userCommands[newIndex] || ""); // Nastavit příkaz podle indexu
        return newIndex;
      });
    } else if (e.key === "ArrowDown") {
      setCommandIndex((prev) => {
        if (prev === null) return null; // Žádný index nastaven
        const newIndex = Math.min(userCommands.length, prev + 1);
        setCurrentInput(userCommands[newIndex] || ""); // Vymazat, pokud jsme na konci
        return newIndex >= userCommands.length ? null : newIndex;
      });
    }
  };
  
  const renderLoadingScreen = () => (
    <div className="flex flex-col items-center justify-center h-full">
      <img
        src="./assets/logo.jpg"
        alt="Logo"
        className="w-32 h-32 rounded-full animate-spin"
      />
      <p className="mt-4 text-2xl" style={{ color: theme.accent }}>
        {isBooting ? "Booting OndrejOS..." : "Rebooting OndrejOS..."}
      </p>
    </div>
  );

  return (
    <div
      className="h-screen p-4 font-mono transition-all duration-500"
      style={{
        backgroundColor: theme.background,
        color: theme.text,
      }}
    >
      {isBooting || isRebooting ? (
        renderLoadingScreen()
      ) : (
        <div className="overflow-auto h-full" ref={terminalRef}>
          {history.map((line, index) => (
            <div key={index} className="whitespace-pre-line">
              {line}
            </div>
          ))}
          <div className="flex">
            <span style={{ color: theme.accent }} className="mr-2">
              $
            </span>
            <input
              className="bg-transparent flex-1 outline-none"
              style={{ color: theme.text }}
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminal;
