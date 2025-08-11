import './styleCheckBoxIuni.css'
const CheckBoxIuni = ({label, checked, onChange}) =>{
    return (
      <>
      <div className='container-check'>
        <label className='checkbox-label'>
          <input 
            className='input-checkbox' 
            type='checkbox'
            checked={checked}
            onChange={onChange}
          />
          <span className='span-checkbox'></span>
        </label>
        <p className='p-check'>{label}</p>
      </div>
      </>
    )
}
export default CheckBoxIuni;


