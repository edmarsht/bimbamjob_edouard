import { useState, useEffect, useMemo } from "react";
import "./App.css";

function App() {
  const [myAxes, setMyAxes] = useState({});
  const [dimension, setDimension] = useState();
  const [xDim, setXDim] = useState(0);
  const [yDim, setYDim] = useState(0);
  const [myPosition, setMyPosition] = useState();
  const [position, setPosition] = useState();
  const updatedState = {};
  const [instructionLocation, setInstructionLocation] = useState();
  const [fileName, setFileName] = useState("");
  const [displayResult, setDisplayResult] = useState(false);

  // Collect and store data from a .txt file (dimension / position / instruction)
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setFileName(file.name);

      const fileContent = reader.result.split("\n");
      setDimension(splitIntoArray(fileContent[0]));
      setPosition(fileContent[1].split(""));
      setInstructionLocation(fileContent[2].split(""));
    };
    reader.onerror = () => {
      console.log("file error", reader.error);
    };
  };

  // Split Number to an array
  const splitIntoArray = (num) => {
    return Array.from(String(num), Number);
  }

  // Run instruction and store result in MyAxes state
  const Search = () => {
    for (var j = 0; j < instructionLocation.length; j++) {
      if (updatedState.dir === "N") {
        for (var i = 0; i < instructionLocation.length; i++) {
          if (instructionLocation[j] === "R") {
            updatedState.dir = "E";
            break;
          } else if (instructionLocation[j] === "L") {
            updatedState.dir = "W";
            break;
          } else if (instructionLocation[j] === "F") {
            if (updatedState.y !== yDim) {
              updatedState.y++;
            }
            break;
          }
        }
      } else if (updatedState.dir === "E") {
        for (var i = 0; i < instructionLocation.length; i++) {
          if (instructionLocation[j] === "R") {
            updatedState.dir = "S";
            break;
          } else if (instructionLocation[j] === "L") {
            updatedState.dir = "N";
            break;
          } else if (instructionLocation[j] === "F") {
            if (updatedState.x !== xDim) {
              updatedState.x++;
            }
            break;
          }
        }
      } else if (updatedState.dir === "S") {
        for (var i = 0; i < instructionLocation.length; i++) {
          if (instructionLocation[j] === "R") {
            updatedState.dir = "W";
            break;
          } else if (instructionLocation[j] === "L") {
            updatedState.dir = "E";
            break;
          } else if (instructionLocation[j] === "F") {
            if (updatedState.y !== 0) {
              updatedState.y--;
            }
            break;
          }
        }
      } else if (updatedState.dir === "W") {
        for (var i = 0; i < instructionLocation.length; i++) {
          if (instructionLocation[j] === "R") {
            updatedState.dir = "N";
            break;
          } else if (instructionLocation[j] === "L") {
            updatedState.dir = "S";
            break;
          } else if (instructionLocation[j] === "F") {
            if (updatedState.x !== 0) {
              updatedState.x--;
            }
            break;
          }
        }
      }
    }
    setMyAxes(updatedState);
    setDisplayResult(true);
  };

  // Store position in a js constant when exist after collected from .txt file
  // because we need to use it and change it in a same function Search()
  useEffect(() => {
    if (myPosition) {
      updatedState.x = myPosition.x;
      updatedState.y = myPosition.y;
      updatedState.dir = myPosition.dir;
    }
  }, [myPosition]);

  // Store dimension / position in the state
  useEffect(() => {
    if (position && dimension) {
      setXDim(dimension[0]);
      setYDim(dimension[1]);
      setMyPosition({
        x: Number(position[0]),
        y: Number(position[1]),
        dir: String(position[2]),
      });
    }
  }, [dimension, position, instructionLocation]);

  return (
    <div>
      <div>
        <h2>Ma BimBamJob Tondeuse </h2>
        <div>
          {dimension && myPosition && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
              }}
            >
              <p>
                Les Dimensions du tableau : {xDim}
                {yDim}
              </p>
              <p>
                Ma position x : {myPosition.x}, y : {myPosition.y} et mon
                orientation : {myPosition.dir}
              </p>
            </div>
          )}
        </div>
        {dimension && !displayResult && (
          <button onClick={Search}>Lancer une tondeuse</button>
        )}
      </div>
      {!dimension && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <input type="file" onChange={handleFile} />
        </div>
      )}
      {fileName && <p> Nom du fichier : {fileName}</p>}
      {displayResult && (
        <div>
          La tondeuse se trouve [{myAxes.x}, {myAxes.y}] et orientation{" "}
          {myAxes.dir}
        </div>
      )}
      {displayResult && (
        <button style={{marginTop:"1rem"}} onClick={() => location.reload()}>Relancer une tondeuse du début</button>
      )}
    </div>
  );
}

export default App;
