import {useForm} from "react-hook-form";
import {useNavigate,useParams} from "react-router-dom";
import * as StudentService from "../service/StudentService";
import Swal from "sweetalert2";
import {useEffect, useState} from "react";


function Update(){

    const {id} = useParams()
    const [studentR,setStudent] = useState({});
    const {register, handleSubmit, formState: {errors}} = useForm();

    const navigate = useNavigate();

    const handleError = {
        name:{
            required:"Không được để trống",
            minLength:{
                value:5,
                message:"Tên phải nhiều hơn 5 ký tự"}
        },
        dateOfBirth:{required:"Không được để trống"}
    }

    const update = async () =>{
        await StudentService.update(studentR).then(
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Chỉnh sửa thành công ',
                showConfirmButton: false,
                timer: 2000
            })
        )
        navigate('/')
    }

    const findById = async () =>{
        const student = await StudentService.findById(id);
        setStudent(student.data);
    }

    const setValue= event =>{
        setStudent({...studentR,[event.target.name]:event.target.value})
    }

    useEffect(()=>{
        findById();
    },[])

    return(

        <form onSubmit={handleSubmit(update)}>
            <div className={"text-center"}>
                <h1>Chỉnh sửa</h1>
                <input style={{display:'none'}} value={studentR.id} name="id"  {...register("id")}/>
                <div style={{height:'100px'}}>
                    <span>tên : </span>
                    <input className={"form-control"} style={{width:'200px',marginLeft:'650px'}} name="name" placeholder={"tên"}
                           {...register("name",handleError.name)} value={studentR.name} onChange={setValue}/>
                    <span style={{color:'red'}}>{errors?.name && errors.name.message}</span>
                </div>

                <div style={{height:'100px'}}>
                    <span>ngày sinh : </span>
                    <input type={'date'} className={"form-control"} style={{width:'200px',marginLeft:'650px'}} name="dateOfBirth" placeholder={"ngày sinh"}
                           {...register("dateOfBirth",handleError.dateOfBirth)} value={studentR.dateOfBirth} onChange={setValue}/>
                    <span style={{color:'red'}}>{errors?.dateOfBirth && errors.dateOfBirth.message}</span>
                </div>

                <button type={"submit"} className={"btn btn-info"}>Lưu</button>
            </div>
        </form>
    )
}
export default Update