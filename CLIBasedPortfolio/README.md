# HighSeas: Terminal Portfolio
Welcome to Terminal Portfolio, a CLI-styled personal portfolio built with **ReactTS** and **TailwindCSS**. This application mimics a terminal interface, providing a unique and interactive way to showcase information about me.

## 🚀 Features
- Command Line Interaction: Use intuitive commands to navigate through the portfolio.
- Customizable Themes: Choose from several terminal themes like Monokai, Solarized, Gruvbox, and more.
- Realistic Booting & Rebooting: Experience a simulated boot screen for added immersion.
- Fully Responsive: Works seamlessly on all devices, from desktops to mobile screens.
- Expandable & Modular: Easily add new commands or themes.

**Demo:** [here](https://ondrejpacovsky.cz/demo/highseas/CliBasedPortfolio/index.html)

## 📸 Preview
![Preview](https://ondrejpacovsky.cz/demo/highseas/CliBasedPortfolio/preview.jpg)

🛠️ Commands
Below are the available commands you can use in the terminal:

| Command  | Description |
| ------------- | ------------- |
| help | Displays a list of all available commands. |
| aboutme | Prints information about me. |
| loadgui | Opens the graphical version of my portfolio. |
| clear | Clears the terminal history. |
| reboot | Reboots the terminal interface. |
| theme list | Lists all available themes. |
| theme [name] | Changes the terminal theme (e.g., theme monokai). |
| echo [message] | Prints the provided message back to the terminal. |
| ls | Lists available files in the directory. |
| cat [File name] | Outputs the content of a file (e.g., cat hello.txt). |

## 🎨 Themes
Choose your favorite look with one of the pre-defined themes:

- Default
- Solarized
- Gruvbox
- Monokai
- Nord
- Dracula
- Material

## 📦 Installation
1. Clone this repository:
```
git clone https://github.com/yourusername/terminal-portfolio.git
cd terminal-portfolio
```
2. Install dependencies:
```
npm install
```
3. Run the development server:
```
npm start
```
Open the application in your browser at http://localhost:3000 (or other selected port).

## ⚙️ Customization
### Adding Commands
To add a new command:

1. Navigate to the handleCommand function in Terminal.tsx.
2. Add a new case with your desired command logic.
Example:
```
case "mycommand":
  return ["This is my custom command!"];
```
### Adding Themes
To add a new theme:
1. Add a new theme to the themes array.
2. Provide name, background, text, and accent colors.
Example:
```
{ name: "newtheme", background: "#123456", text: "#ffffff", accent: "#ff5722" }
```
## 🛡️ License
This project is licensed under the MIT License. See the LICENSE file for details.
<br>
<br>
Made with ❤️ by Ondrej Pacovsky for High Seas ☠!
