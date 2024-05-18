import pool from "../config/db.js";

const argumento = process.argv.slice(2)
const opcion = argumento[0]
let nombre = argumento[1]
let rut = argumento[2]
let curso = argumento[3]
let nivel = argumento[4]

//Agregar estudiante a la tabla
const agregarEstudiante = async () => {
    try {
        const text = "INSERT INTO estudiantes (nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)"
        const values = [nombre, rut, curso, nivel]
        const response = await pool.query(text, values)
        console.log(`Estudiante ${nombre} agregado con éxito`)
    } catch (error) {
        console.log(error);
    }
}

//Buscar estudiante por rut
const rutEstudiante = async () => {
    try {
        const text = "SELECT * from estudiantes WHERE rut = $1"
        const values = [rut]
        const response = await pool.query(text, values)
        console.log('El rut corresponde a:', response.rows)
    } catch (error) {
        console.log(error.message)
    }
}

//Mostrar todos los registros de la tabla
const registroEstudiantes = async () => {
    try {
        const text = "SELECT * from estudiantes"
        const response = await pool.query(text)
        console.log('Registro de estudiantes:', response.rows)
    } catch (error) {
        console.log(error)
    }
}

//Editar datos de un estudiante
const editarEstudiante = async () => {
    try {
        const text = "UPDATE estudiantes SET rut = $1, curso = $2, nivel = $3 WHERE nombre = $4"
        const values = [rut, curso, nivel, nombre]
        const response = await pool.query(text, values)
        console.log(`Estudiante ${nombre} ha sido editado con éxito`)
    } catch (error) {
        console.log(error)
    }
}

//Borrar un estudiante
const borrarEstudiante = async () => {
    try {
        const text = "DELETE FROM estudiantes WHERE nombre = $1"
        const values = [nombre]
        const response = await pool.query(text, values)
        console.log(`Estudiante ${nombre} eliminado con éxito`)
    } catch (error) {
        console.log(error)
    }
}

//Ejecutar el programa
if (opcion === 'agregar') {
    agregarEstudiante()
} else if (opcion === 'rut') {
    rut = argumento[1]
    rutEstudiante()
} else if (opcion === 'registro') {
    registroEstudiantes()
} else if (opcion === 'editar') {
    rut = argumento[1]
    curso = argumento[2]
    nivel = argumento[3]
    nombre = argumento[4]
    editarEstudiante()
} else if(opcion === 'borrar'){
    borrarEstudiante()
} else {
    console.log('Opcion invalida')
}

