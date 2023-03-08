const root = ReactDOM.createRoot(document.querySelector('#root'));
const App = () => {
    const[characters,setCharacters] = React.useState([])
    React.useEffect(() => {
        const fetchCharacters = async()=>{
            const response = await axios.get('/api/characters')
            setCharacters(response.data)
        }
        fetchCharacters()
    },[])
    const create = async() => {
        const response = await axios.post('/api/characters',{
            name:Math.random()
        })
        setCharacters([...characters,response.data])
    }
    const destroy = async(character) => {
        const response =  await axios.delete(`/api/characters/${character.id}`)
        setCharacters(characters.filter(c => c.id !== character.id))
    }

    return (
        <div>
            <h2>Beyblade:Let it rip!</h2>
            <button onClick={ create }>Create a new character</button>
            <ul>
                {
                    characters.map(character => {
                        return (
                            <li>
                                {character.name}
                                <button onClick = {()=> destroy(character)}>x</button>
                            </li>
                        )
                    })
                }
            </ul>

        </div>
    )
}

root.render(<App />)