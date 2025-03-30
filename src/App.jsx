import { useState, useCallback, useEffect } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let generatedPassword = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) {
      str += "0123456789";
    }
    if (character) {
      str += "}!@#$%^&*()[]\\>?,./-_=+|{<";
    }

    for (let i = 0; i < length; i++) {
      let char = str.charAt(Math.floor(Math.random() * str.length));
      generatedPassword += char;
    }

    setPassword(generatedPassword);
  }, [length, character, number]);

  useEffect(() => {
    passwordGenerator();
  }, [length, character, number, passwordGenerator]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    alert("Click OK to copy the password");
  };

  return (
    <>
      <div className="bg-white w-[90vw] sm:w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8">
        <h1 className="text-black text-xl font-bold text-center mb-4">
          Password Generator
        </h1>

        <div className="flex rounded-lg shadow mb-4">
          <input
            className="outline-none w-full py-2 px-4 bg-blue-100 rounded-l-lg"
            type="text"
            placeholder="Password"
            value={password}
            readOnly
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4 text-sm">
          {/* Slider for Length */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="w-full cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="text-lg whitespace-nowrap">
              Length: {length}
            </label>
          </div>

          <div className="flex flex-col sm:flex-row sm:gap-8 gap-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={number}
                id="numberinput"
                onChange={() => setNumber((prev) => !prev)}
              />
              <label className="text-lg flex">Include Numbers</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={character}
                id="charinput"
                onChange={() => setCharacter((prev) => !prev)}
              />
              <label className="text-lg flex">Include Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
