import { useState, useEffect} from "react";
import './Post.scss'
const Post2=()=>{
    
const [value,setValue]=useState('')
const [tag,setTag]=useState('')
const[data,setData]=useState([])
const[note,setNote]=useState([])
const[json,setJson]=useState(null);
const [colltag,Setcoltag]=useState([])


  
    
    
    const noteChange=(e)=>{
        setTag(e.target.value)
            
        }
    const searchTag=(e)=>{
            e.preventDefault();
            // let date=data
            let arr=JSON.parse(JSON.stringify(data))
            let b=arr.filter((i)=>{
                return i.includes(tag)
            })
           Setcoltag(b)
           console.log(colltag)

        }
    const handleChange=(e)=> {
        setValue(e.target.value)
           
            let val =value.split(/(#[a-z\d-]+)/);
            console.log(val)
            for (let i = 0; i < val.length; i++) {
                if (val[i].charAt(0) === "#") {
                    let array = [];
                    array.push(val[i]);
                    setNote(array)
                    
                }
            }
        }
        const handleSubmit=(e) =>{
            e.preventDefault();
            let myJson = {
                data:data,
                note:note
            };
           
            setData(
                data.concat(value)
            )
            setJson(JSON.stringify(myJson))
           console.log(note)
        }
         const delPost = (index)=>{//+++++++++++++++++++++++++++++++++++++++
            let arr=JSON.parse(JSON.stringify(data))
            arr.splice(index,1);
            setData(arr)
            console.log(data)
            
        };
         const delHashtag = (index)=>{//+++++++++++++++++++++++++++++++++++++
             let tag=note;
             let val=value;
             let del=tag.splice(index,1)
             let clearTag = val.substring(0, val.length - 1).replace(del,'');
             setNote(tag)
             setValue(clearTag)
            
         };
        const edit = (index)=>{
        let val = value;
        let arr = data;
        arr.splice(index,1,val);
        setData(arr)
        console.log(data)
        };

        const handleActive=(item)=>{
            setValue(item)
            
            }
            
    return(
        <>
         <div className="Post">
                <form className="someText">
                    <textarea value={value} onChange={handleChange} placeholder="Введите техт"></textarea>
                    <button className="save" onClick={handleSubmit}>Сохранить</button>
                </form>
                <form className="searchTag">
                    <input placeholder="Искать заметку по тегу" value={tag} onChange={noteChange} />
                    <button className="tagButton" onClick={searchTag}>Искать</button>
                </form>
                <ul className='listBox'>
                    {data.length > 0? data.map((item, index) =>
                        <div key={index} className='notes'>
                            <li onClick={()=>handleActive(item)} className='someNote'>{item}</li>
                          
                            <button onClick={() => edit(index)} className='changeNote'>Изменить заметку</button>
                            <button onClick={() => delPost(index)} className='delNote'>Удалить заметку</button>
                        </div>                    
                    ) : null}
                </ul>
                
                <ul className='containerNote'>
                    {note.length > 0 ? note.map((item, index)=>
                        <div key={index} className='tags'>
                            <li className='someTag'>{item}</li>
                            <button onClick={() => delHashtag(index)} className='delTag'>Удалить тэг</button>
                        </div>
                    ): null}
                </ul>
                <h1 className="findtag">найденные тэги</h1>
                <div>{colltag.map((item,index)=> 
                <div key={index}>
                    <li>{item}</li>
                </div>
                )}</div>
            </div>
        </>
    )
}
export default Post2