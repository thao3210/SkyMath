import React from "react";

function NumericalResponse() {
  return (
    <div className="m-5">
      {/* <div>
        <h1>Cac so tu 1-10</h1>
      </div> */}
      <form className="p-2">
        <div className="px-2">
          <h3>Cau 1: (1d)</h3>
        </div>
        <div className="card card-body my-2 mx-5">

          <label for="exampleDataList" class="form-label">
            <h4>Co may cai but trong hinh:</h4>
          </label>
          <input
            class="w-25"
            type="number"
            list="datalistOptions"
            id="exampleDataList"
            placeholder="Number..."
          />
          <datalist id="datalistOptions">
            <option value="2" />
            <option value="3" />
            <option value="4" />
            <option value="4" />
            <option value="6" />
          </datalist>
        </div>
      </form>
    </div>
  );
}

export default NumericalResponse;
