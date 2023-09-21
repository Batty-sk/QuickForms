import { useState,useRef,useEffect } from "react";
import './FormBox.css'
import Draggable from 'react-draggable';
import { useDrag } from 'react-dnd';

const FormBox = ({setBox,index,data,deletebox}) => {
                
  console.log('data coming ',data)
    const[Question,setQuestion]=useState(data.Question||'Question')
    const [imageURL, setImageURL] = useState(data.Image?data.Image:'');
    const [selectedOption, setSelectedOption] = useState(null); // State to track the selected option
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const dropdownRef = useRef(null); // Ref to the dropdown container
    const [radiobtn,setRadiobtn]=useState(data.RadioBtn?data.RadioBtn:false)
    const [checkbox,setCheckbox]=useState(data.CheckBox?data.CheckBox:false)
    const [textbox,setTextbox]=useState(data.TextBox?data.TextBox:false)
    const [date,setDate]=useState(data.Date?data.Date:false)
    const [required,setRequired]=useState(data.Required?data.Required:false)
    console.log('data in form box',data.CheckBox)
  

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log('image url',e.target.result)
            setImageURL(e.target.result); // Set the image URL
          };
          reader.readAsDataURL(file);
        }
      };
      const handleOptionSelect = (option) => {
        setDropdownVisible(false)
        setRadiobtn(false)
        setDate(false)
        setTextbox(false)
        setCheckbox(false)
        setSelectedOption(option);
      };

      const handleRenderElement=(element)=>{
          switch (element)
          {
            case 'textbox':
              if (!textbox)
                setTextbox(true)
              return <div  className='textbox' >TextBox</div>
            case 'date':
              if (!date)
                setDate(true)
              return <input type="date" name="date" className="date" disabled/>
            case 'checkbox':
              if(checkbox!=false){
                  console.log('checkbox is not false ')
                  return (<div>{checkbox.map((value,index)=>{
                    return( <span><input type="checkbox" name="" disabled /> <input type='text' value={value.option} onChange={(e)=>handleChangeValue(index,e.target.value)}/></span>)                    
                  })}

              {checkbox.length < 4?
              <div className="add-more">
                <a href="#" onClick={()=>handleAddmore()}> Add More </a>
              </div>
              :null}
              <div className="delete">
                <a href="" onClick={handleOptionDelete}>delete</a>
              </div>
                  </div>
                  )

              }

              setCheckbox([{option:'option'}])
            break

          case 'radiobtn':
            if(radiobtn!=false){
              return <div>{radiobtn.map((value,index)=>{
                return <span key={index}><input type="radio" name="" disabled /><input type='text' value={value.option} defaultValue={value.option+index+1} onChange={(e)=>handleChangeValue(index,e.target.value)}/></span>
              })}
              {radiobtn.length < 4?
              <div className="add-more">
                <a href="#" onClick={()=>handleAddmore()}> Add More </a>
              </div>
              :null}
              <div className="delete">
                <a href="#" onClick={(e)=>{handleOptionDelete(e)}}>delete</a>
              </div>
              </div>

          }
          setRadiobtn([{option:'option'}])
          break;

          }
          return null

      }
      const handleOptionDelete=(e)=>{
        console.log('deleting..')
        e.preventDefault()
        if(selectedOption=='checkbox')
        {

            let arr=[...checkbox]
            arr.pop()
            if (arr.length == 0)
                  setSelectedOption('')
            else{
            setCheckbox(arr)
            }
        }
        else{
          let arr=[...radiobtn]
          arr.pop()
          if (arr.length == 0)
                setSelectedOption('')
          else{
          setRadiobtn(arr)
          }
        }
      }
      const handleChangeValue=(index,value)=>{
          if(selectedOption=='checkbox')
              {
                let arr=[...checkbox]
                arr[index].option=value
                console.log('here ',arr);
                setCheckbox(arr)
              }
          else{
            let arr=[...radiobtn]
            arr[index].option=value
            setRadiobtn(arr)
          }
      }

      const handleAddmore=(kya)=>{
          if(selectedOption=='checkbox')
          {
            let arr=[...checkbox,{option:'option'}]
            setCheckbox(arr)
          }
          else{
            let arr=[...radiobtn,{option:'option'}]
            setRadiobtn(arr)
          }
      }

      const handleOnBlur=()=>{
        setBox(index,{Question:Question,Image:imageURL,Date:date,CheckBox:checkbox,RadioBtn:radiobtn,Required:required,TextBox:textbox})
      }

      useEffect(() => {

        if(data)
        {
          if(data.CheckBox)
          {
            setSelectedOption('checkbox')
          }
          else if(data.RadioBtn)
          { 
            setSelectedOption('radiobtn')
          }
          else if(data.Date)
          {
            setSelectedOption('date')
          }          
          else if(data.TextBox)
          {
            setSelectedOption('textbox')
          }
        }
        // Function to close dropdown when clicking outside
        const handleClickOutside = (event) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            console.log('clicked outside')
            setDropdownVisible(false);
          }

        };
    
        document.addEventListener('mouseup', handleClickOutside);
    
        // Clean up the event listener
        return () => {
          document.removeEventListener('mouseup', handleClickOutside);
        }
    },[]);
  
    useEffect(()=>{
      console.log('calling parent setbox')
        handleOnBlur()
    },[textbox,checkbox,radiobtn,date,imageURL,required,Question])
    
    const handleTrash=()=>
    {
      deletebox(index)
    } 


 return (
    <div className="row formbox mono" onBlur={handleOnBlur}  style={{ border: '1px solid black', padding: '10px', margin: '10px' }} >
      <div className="col-12">
        <div className="row">
          <div className="col-10 ">
            <div contentEditable={true} className="question" onBlur={(e)=>{
                console.log('value',e.target.textContent)
                setQuestion(e.target.textContent)}} role="textbox">
                {Question || 'Question'} 
            </div>
          </div>
          <div className="col-2 text-center ">
           {/*  <label className="bi bi-image" style={{ cursor: 'pointer' }}>
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </label> */}
              <span className="bi bi-trash" onClick={handleTrash}></span>
            </div>
        </div>
      </div>
        <div className="resizable-image">
        {imageURL && (
                <Draggable bounds="parent">
                  <img src={imageURL} alt="Uploaded" />
                </Draggable>
              )}
          </div>
        
      <div className="selected-option">
          {handleRenderElement(selectedOption)}
      </div>

      <div className="col-12 text-center add-item " >

              
              <i className="bi bi-plus-circle-dotted " style={{ cursor: 'pointer', fontSize:'100px',  }} onClick={()=>{
                setDropdownVisible(true)
              }}>
                    </i>
              { dropdownVisible && <div className="dropdown-options mb-5 bg-white" ref={dropdownRef}>
                <option value="textbox" onClick={(e)=>{ e.stopPropagation();handleOptionSelect('textbox')}}>TextBox</option>
                <option value="radio" onClick={(e)=>{ e.stopPropagation();handleOptionSelect('radiobtn')}}>Multiple Choice</option>
                <option value="checkbox" onClick={(e)=>{ e.stopPropagation();handleOptionSelect('checkbox')}}>Checkbox</option>
                <option value="date" onClick={(e)=>{ e.stopPropagation();handleOptionSelect('date')}}>Date</option>
                </div>}

            </div>
      <div className="col-12 text-center">
            <button className={`btn  ${'click'+required}`} onClick={()=>{
              setRequired(!required)
            }}>Required</button>
        </div>
    </div>
  );
};
export default FormBox