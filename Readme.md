# Points Bisection using Fiedler Vector

## Prerequisites

* Node + npm (Linux: https://github.com/nvm-sh/nvm, Windows: https://github.com/coreybutler/nvm-windows)
* Python 3 (generating points, plotting the results)
* Jupyter (Notes & Theory)

## Installation & Execution

1. In the console, execute `npm i`
2. In order to run the program, type `npm start -- --in="<inputfile>" --out="<outputfile>"`
3. You can add `-v` to flags in order to see verbose logs

#### Hint: the easiest way to generate the points, execute the program and see the results is to run the following command: `python randompoints.py in.txt <number_of_points> <x_boundary> <y_boundary> <z_boundary> <dist> && npm start -- --in="in.txt" --out="out.txt" && python visualize.py out.txt`

## Mathematical Model

All information can be found in `theory.ipynb`. In order to access the file, you must open it using Jupyter Lab (or you can simply click on it in Github).

