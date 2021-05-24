import {useState} from 'react'

const AddTask = ({adder}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)
    const [edit, setedit] = useState(false)

    const onSubmit = (ev) => {
        ev.preventDefault()

        if (!text) {
            alert("Add task before submitting")
            return
        }
        
        if (!day) {
            alert("Add day before submitting")
            return   
        }

        if (parseInt(day.substring(0,2)) > 31){
            alert("Enter a Valid Day")
            return
        }
        if (parseInt(day.substring(3,5)) > 18){
            alert("Enter an hour between 8 and 18")
            return
        }
        if (parseInt(day.substring(3,5)) > 8){
            alert("Enter an hour between 8 and 18")
            return
        }
        if (parseInt(day.substring(6,8)) > 59){
            alert("Enter a Valid Minute Value")
            return
        }
        
        
        setedit(false)

        adder({text, day, reminder, edit})

        setText('')
        setDay('')
        setReminder(false)
        setedit(false)
    }
    

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Appointment</label>
                <input type='text' placeholder='Add Appointment' value={text} 
                    onChange={(ev) => setText(ev.target.value)} />
            </div>
            
            <div className='form-control'>
                <label>Day and time</label>
                <input type='text' placeholder='dd-hh-mm' value={day}
                    onChange={(ev) => setDay(ev.target.value)} />
            </div>
            
            <div className='form-control form-control-check'>
                <label>Set reminder</label>
                <input type='checkbox' value={reminder} checked={reminder}
                    onChange={(ev) => setReminder(ev.currentTarget.checked)} />
            </div>

            <input type='submit' value='Save Appointment' className='btn btn-block' />
        </form>
    )
}

export default AddTask
