import {useState} from 'react'

const EditTask = ({tex, da, id, changer, del, refresh}) => {

    const [text, setText] = useState(tex)
    const [day, setDay] = useState(da)
    const reminder = false
    const edit = false

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

        del(id)        
        changer({text, day, reminder, edit})
            
        refresh()
        
    }
    

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Appointment</label>
                <input type='text' placeholder='Edit Appointment' value={text} 
                    onChange={(ev) => setText(ev.target.value)} />
            </div>
            
            <div className='form-control'>
                <label>Day and time</label>
                <input type='text' placeholder='dd-hh-mm' value={day}
                    onChange={(ev) => setDay(ev.target.value)} />
            </div>

            <input type='submit' value='Save Changes' className='btn btn-block' />
        </form>
    )
}

export default EditTask
