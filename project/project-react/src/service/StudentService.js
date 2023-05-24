import axios from "axios";

export const getAll = async() => {
    const studentList = await axios.get("http://localhost:3000/student")
    return studentList.data;
}

export const deleteStudent = async(id) => {
    await axios.delete("http://localhost:3000/student/"+id)
}


export const create = async(student) => {
    await axios.post("http://localhost:3000/student/",student)
}

export const findById = async(id) => {
    const student = await axios.get("http://localhost:3000/student/"+id)
    return student
}

export const update = async(student) => {
    await axios.put("http://localhost:3000/student/" + student.id,student)
}