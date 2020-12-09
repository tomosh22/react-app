import React from "react";

function App(){
  return(
      <div>
          <h1>Create New Account</h1>
          <label htmlFor="type">Type:</label>
          <select id="type" name="type">
              <option value="current">Current</option>
              <option value="savings">Savings</option>
          </select>
          <br></br>
          <br></br>
          <label htmlFor="currency">Currency:</label>
          <select id="currency" name="currency">
              <option value="£">£</option>
              <option value="$">$</option>
              <option value="€">€</option>
          </select>
          <br></br>
          <br></br>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name"></input>
          <br></br>
          <br></br>
          <label htmlFor="balance">Balance:</label>
          <input type="number" step="0.01" id="balance" name="balance"></input>
          <br></br>
          <br></br>
          <button type="button" onClick="Create()" formAction="">Submit</button>
      </div>

  );
}

export default App;
