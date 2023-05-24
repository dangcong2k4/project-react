import * as StudentService from "./../service/StudentService"
import {useEffect, useState} from "react";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

const StudentList =() => {
    const [studentList,setStudentList] = useState([]);
    const navigate = useNavigate();
    // const [student,setStudent] = useState([]);

    const getList = async () => {
        const studentList = await StudentService.getAll();
        console.log(studentList)
        setStudentList(studentList);
    }

    const deleteStudent = async (id) =>{
        await StudentService.deleteStudent(id);
        getList();
    }

    const deleteStudent1 = (id , name) =>{
        Swal.fire({
            title: 'Bạn có muốn xóa?',
            text: 'Học sinh: ' + name,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#BBBBBB',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteStudent(id)
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Xóa thành công ',
                        showConfirmButton: false,
                        timer: 2000
                    });

            }
        });
    }

    useEffect(()=>{
        getList();
    },[])


    return(
        <div>

        <h1 className={"text-center"}>Danh sách học sinh</h1>
         <button className={"btn btn-info "} style={{marginLeft:'650px'}} onClick={() =>navigate("/create")}> thêm mới</button>
        <table className="table table-striped">
            <thead>
            <tr>
                <th scope="col">STT</th>
                <th scope="col">Tên</th>
                <th scope="col">Ngày Sinh</th>
                <th scope="col">Xóa</th>
                <th scope="col">Chỉnh sửa</th>
            </tr>
            </thead>
            <tbody>
            {studentList.map((item,index)=>(
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{item.name}</td>
                    <td>{item.dateOfBirth}</td>
                    <td>
                        <button className={"btn btn-danger"} onClick={() =>deleteStudent1(item.id,item.name)}>Xóa</button>
                    </td>
                    <td>
                        <button className={"btn btn-primary"} onClick={() => navigate('/update/'+item.id)}>Chỉnh sửa</button>
                    </td>

                </tr>
            ))}

            </tbody>
        </table>
        </div>
    )
}
export default StudentList;