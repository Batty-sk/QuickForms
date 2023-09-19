import React, { useEffect, useState } from "react";

function FormRender(props) {
  console.log('props.filleddataa',props.filledData)
  const [textbox, setTextbox] = useState(props.filledData.TextBox?props.filledData.TextBox:"");

  console.log('initial textbox data',textbox)
  const [radiovalue, setRadioValue] = useState(props.filledData.RadioBtn?props.filledData.RadioBtn:"");
  const [checkboxvalue, setCheckBoxValue] = useState(props.filledData.CheckBox?props.filledData.CheckBox:[]);
  const [date, setDate] = useState(props.filledData.Date?props.filledData.Date:"");
  console.log('initial date coming',date)
  const [disabled,setDisabled]=useState(false)
  
  const handleInputChange = () => {
    props.saveData(props.index, {
      Date: date,
      CheckBox: checkboxvalue,
      RadioBtn: radiovalue,
      TextBox: textbox,
    });
  };

  useEffect(()=>{
    if(props.filledData)
        setDisabled(true)
  },[])
  useEffect(() => { 
    handleInputChange();
  }, [textbox, radiovalue, checkboxvalue, date]);

  return (
    <div className="container">
    <div className={`row mt-5 form-render mono `}>
      <div className="col-12 question">
        {props.data.Required && <p className="required">*</p>}
        <h3>{props.data.Question}</h3>
        {props.data.Image ? <img src={props.data.Image} alt="image" /> : null}
      </div>
      <div className="col-12 mt-3">
        {props.data.TextBox ? 
          <div
            contentEditable={props.filledData.TextBox?false:true}
            className="textbox"
            onBlur={(e) => {
              setTextbox(e.target.textContent);
            }}

          >{props.filledData.TextBox?props.filledData.TextBox:null}</div>
        : props.data.CheckBox.length ? (
          <div>
            {props.data.CheckBox.map((value, index) => {
              return (
                <span key={index} className="pe-3">
                  <input
                    type="checkbox"
                    onChange={() => {
                      if (checkboxvalue.includes(value.option)) {
                        // Remove the option from the array if already selected
                        setCheckBoxValue(checkboxvalue.filter(item => item !== value.option));
                      } else {
                        // Add the option to the array if not selected
                        setCheckBoxValue([...checkboxvalue, value.option]);
                      }
                    }}
                    checked={checkboxvalue.includes(value.option)}
                    disabled={disabled}
                  ></input>
                  <label>{value.option}</label>
                </span>
              );
            })}
          </div>
        ) : props.data.RadioBtn ? (
          <div>
            {props.data.RadioBtn.map((value, index) => {
              return (
                <span key={index} className="pe-3">
                  <input
                    type="radio"
                    onChange={() => setRadioValue(value.option)}
                    checked={radiovalue === value.option}
                    key={index}
                    disabled={disabled}

                  ></input>
                  <label>{value.option}</label>
                </span>
              );
            })}
          </div>
        ) : props.data.Date ?  
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            disabled={disabled}

          />
         : null}
      </div>
    </div>
    </div>
  );
}

export default FormRender;
