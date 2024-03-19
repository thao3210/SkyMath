import React from "react";
import ReactQuill from "react-quill";

function OpenEndedQuestion() {
  return (
    <div className="m-5">
      {/* <div>
        <h1>Cac so tu 1-10</h1>
      </div> */}
      <form className="p-2">
        <div className="px-2">
          <h3>Cau 1: (1d)</h3>
        </div>
        <div className="my-2 mx-5">
          <h4>Co may cai but trong hinh:</h4>
          <div className="">
            <div class="">
              <div class="">
                <ReactQuill
                  theme="snow"
                  style={{ height: '100px', borderRadius: '15px' }}
                  modules={{
                    toolbar: {
                      container: [
                        ["bold", "italic", "underline", "strike"],
                        ["link", "image", "video"],
                        [{ list: "ordered" }, { list: "bullet" }],
                        ["clean"],
                        [{ 'color': [] }, { 'background': [] }],
                        [{ 'font': [] }],
                        [{ 'align': [] }],
                      ],

                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default OpenEndedQuestion;
