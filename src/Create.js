import { useState } from "react";
import { useHistory } from "react-router-dom"

const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('mario')
  const [isPending, setIsPending] = useState(false)
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = {title, body, author};
    setIsPending(true)
    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: {"Content-type": "application/json"},
      body: JSON.stringify(blog)
    }).then(()=> {
      setIsPending(false)
      history.push('/')
      console.log('new blog added')
    })
    
  }
  
  return ( 
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Blog title:</label>
        <input 
        type="text" 
        required 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="">Blog body:</label>
        <textarea
          cols="30" 
          rows="10"
          required
          value={body}
          onChange={(e)=> setBody(e.target.value)}
          >
          </textarea>
        <label htmlFor="">Blog Author:</label>
        <select name="" id="" value={author}
          onChange = {(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        {!isPending && <button>Add Blog</button> }
        {isPending && <button disabled>Adding Blog...</button> }
      </form>
    </div>
   );
}
 
export default Create;