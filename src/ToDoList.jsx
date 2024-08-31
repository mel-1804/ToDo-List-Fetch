import { useState, useEffect } from "react"
export function ToDoList() {

    const [valorActividad, setValorActividad] = useState({ label: "", is_done: false });
    const [arregloTareas, setArregloTareas] = useState([]);
    const [data, setData] = useState({ name: "", todos: [] })
    const [button, setButton] = useState(false)

    const handlerEnter = (e) => {
        console.log(data.name)
        if (e.keyCode === 13) {

            let url = `https://playground.4geeks.com/todo/todos/${data.name}`;
            let options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(valorActividad)
            };

            fetch(url, options)
                .then((respuesta) => {
                    if (respuesta.ok) {
                        return respuesta.json();
                    } else {
                        throw new Error("Hubo un error");
                    }
                })
                .then((result) => {
                    getUserTodos()
                })
                .catch((error) => console.log(error));

            setValorActividad({ label: "", is_done: false })
        }
    }


    const handlerClick = (tarea) => {
        let url = `https://playground.4geeks.com/todo/todos/${tarea.id}`;
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(url, options)
            .then((respuesta) => {
            // console.log(respuesta)
            getUserTodos()
            })
            .catch((error) => console.log(error));

        setValorActividad({ label: "", is_done: false })
    }


    const getUserTodos = () => {
        fetch(`https://playground.4geeks.com/todo/users/${data.name}`)
            .then((respuesta) => {
                // console.log(respuesta);
                if (respuesta.ok) {
                    return respuesta.json();
                } else {
                    throw new Error("Hubo un error");
                }
            })
            .then((result) => {
                // console.log(result)
                setData(result);
                setArregloTareas(result.todos)
            })
            .catch((error) => console.log(error));
    }





    return (
        <div className="fondo d-flex justify-content-center">
            <div className="papel rounded-4 border border-4 p-4">
                <p className="titulo">ToDo<i className="mancuerna fa-solid fa-dumbbell"></i>List</p>
                <div className="usuario">User:
                    <input type="text"
                        className="valorUsuario"
                        placeholder="Enter your user"
                        aria-label="entrada"
                        aria-describedby="basic-addon1"
                        value={data.name}
                        onChange={(e) => setData({
                            ...data,
                            name: e.target.value
                        })}>
                    </input>
                    <button className="botonAcceso"
                        onClick={() => getUserTodos()}
                    >Login</button>
                </div>
                <div className="input-group mb-3">
                    <input type="text"
                        className="entrada"
                        name="entrada"
                        placeholder="Enter your work out"
                        aria-label="entrada"
                        aria-describedby="basic-addon1"
                        value={valorActividad.label}
                        onChange={(e) => setValorActividad({ label: e.target.value, is_done: false })}
                        onKeyDown={(e) => handlerEnter(e)} />
                </div>
                <div>
                    <ul className="listaActividades">
                        {arregloTareas?.map((tarea, i) => {
                            return (
                                <div key={i} className="listaActividades d-flex justify-content-between">
                                    <li className="actividad">{tarea.label}</li>
                                    <button className="eliminar"
                                        onClick={() => handlerClick(tarea)}>
                                        x
                                    </button>
                                </div>
                            )
                        })}
                    </ul>
                </div>
                <div className="contador">
                    {arregloTareas?.length} PENDING ACTIVITIES
                </div>
            </div>
        </div>
    )
}

